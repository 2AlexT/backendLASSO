const getConnection = require('../database/mssql-db');
const sql=require('mssql/msnodesqlv8');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/App-error');
const path=require('path')
const dotenv= require('dotenv')
const { promisify } = require('util');
const multer =require('multer')

let diskStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'upload')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname);
    },
})

let upload = multer({storage:diskStorage}).single('file')

const uploadFile= async(req,res,next)=>{
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err})
        }
        try{
            createNewDocumento(req,res)
        }catch(err){
            res.status(401).json({message:"Error al subir data"})
        }
        
      
    })   
}

const downloadFile=async (req,res)=>{

}

const getDocumentos= async (req,res)=> {
    try{
    const id_articulo= req.params.id_articulo
    const pool= await getConnection();
    const result = await pool
    .request()
    .input("id_articulo",sql.VarChar,id_articulo)
    .query(`Select * from asfi_documento where id_articulo=@id_articulo and indicador='A'`)
    if(!result.recordset[0]){
        res.json({Message:"No existe documento en el articulo"})
    }else{
        res.json(result.recordset)
    }
}catch (err){
        logger.error(err)
    }
}


const createNewDocumento =async (req,res)=>{
    try{
        const id_articulo=Number(req.params.id_articulo)
        if(isNaN(id_articulo)){
            res.status(401).json({Error:"Incluir un numero de verdad"})
        }
        //Variacion para meter al multer ----const {documentoNombre,descripcion,rutaUrl}=req.body
        const documentoNombre = req.file.filename
        const descripcion = null
        const rutaUrl=req.file.path
        
        if (documentoNombre.match(/^ *$/) !== null){//Verificar cuando tenga espacios igual preguntar**
            return res.status(401).json({msg:'Bad request. Pleas fill all fields'})
        }
        console.log(req.headers)
        console.log(req.headers.cookie  )
        if(req.headers.authorization===undefined){return res.status(401).json({ERROR:"ERROR"})}
        let token=req.headers.authorization.split(' ')[1];
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET_ACCESS_TOKEN)
   
    const pool = await getConnection();
    const resultArticuloExiste = await pool.request()
    .input("id_articulo",sql.Int,id_articulo)
    .query(`select identificador from asfi_articulo where identificador=@id_articulo and indicador='A'`)
    //Averiguar sobre id empresa y nombre empresa
    if(!resultArticuloExiste.recordset[0]){
        res.status(401).json({message:'Articulo inexistente'})
    }else{
        const resultDocumentoExiste= await pool.request()
        .input("nombreDocumento",sql.VarChar,documentoNombre)
        .input("id_articulo",sql.Int,id_articulo)
        .query(`select identificador from asfi_documento where nombre_archivo=@nombreDocumento and indicador='A' and id_articulo=@id_articulo`)
       
        if(!resultDocumentoExiste.recordset[0]){
            await pool
            .request()
            .input("I_proceso",sql.Int,0)
            .input("I_identificador",sql.Int,0)
            .input("I_id_articulo",sql.Int,id_articulo)
            .input("I_nombre",sql.VarChar,documentoNombre)
            .input("I_ruta",sql.VarChar,rutaUrl)
            .input("I_descripcion",sql.VarChar,descripcion)
            .input("I_usuario",sql.Int,decoded.id.identificador)
            .input("I_origen",sql.TinyInt,1)
            .output("O_msg_error",sql.VarChar)
            .execute("segabm_documento")
            res.json({message:'Se añadio un nuevo documento'}) 
        }else{
            res.status(401).json({message:"Ya existe documento con el mismo nombre"})           
        }
    }
}catch (err){
        logger.error(err)
    }
}

const modificarDocumento =async (req,res)=>{
    try{
        const id_articulo=Number(req.params.id_articulo)
        if(isNaN(id_articulo)){
            res.status(401).json({Error:"Incluir un numero de verdad"})
        }
        const {documento,newDocumentoName}=req.body
        if (documento.match(/^ *$/) !== null || newDocumentoName.match(/^ *$/) !== null){//Verificar cuando tenga espacios igual preguntar**
            return res.status(401).json({msg:'Bad request. Pleas fill all fields'})
        }
        token=req.headers.authorization.split(' ')[1];
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET_ACCESS_TOKEN)
        console.log(decoded.id.identificador)
    const pool = await getConnection();
    const resultArticuloExiste = await pool.request()
    .input("id_articulo",sql.Int,id_articulo)
    .query(`select identificador from asfi_articulo where identificador=@id_articulo and indicador='A'`)
    //Averiguar sobre id empresa y nombre empresa
   
    if(!resultArticuloExiste.recordset[0]){
        res.json({message:'Articulo con id no existe'})
    }else{
        const resultDocumentoExiste= await pool.request()
        .input("NombresDocumento",sql.VarChar,documento)
        .input("id_articulo",sql.Int,id_articulo)
        .query(`select * from asfi_documento where nombre_archivo=@NombresDocumento and indicador='A' and id_articulo=@id_articulo`)
        console.log(resultDocumentoExiste.recordset[0])
        if(!resultDocumentoExiste.recordset[0]){
            res.json({message:"Articulo con documento no existe o esta modificado"})
        }else{
                await pool
                .request()
                .input("I_proceso",sql.Int,1)
                .input("I_identificador",sql.Int,resultDocumentoExiste.recordset[0]["identificador"])
                .input("I_id_articulo",sql.VarChar,id_articulo)
                .input("I_nombre",sql.VarChar,newDocumentoName)
                .input("I_ruta",sql.VarChar,"randomw")
                .input("I_descripcion",sql.VarChar,"Prueba")
                .input("I_usuario",sql.Int,decoded.id.identificador)
                .input("I_origen",sql.TinyInt,1)
                .output("O_msg_error",sql.VarChar)
                .execute("segabm_documento")
                res.json({message:`Se modifico el articulo :'${documento}' al siguiente valor :${newDocumentoName}`})
        }
    }
}catch (err){
        logger.error(err)
    }
}
module.exports={uploadFile,getDocumentos,createNewDocumento,modificarDocumento}