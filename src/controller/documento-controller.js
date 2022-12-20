const getConnection = require('../database/mssql-db');
const sql=require('mssql/msnodesqlv8');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/App-error');
const path=require('path')
const dotenv= require('dotenv')
const { promisify } = require('util');
const multer =require('multer')



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
        console.log("PSAO A CREAR DOCUMENTO")
        if (documentoNombre.match(/^ *$/) !== null){//Verificar cuando tenga espacios igual preguntar**
            return res.status(401).json({msg:'Bad request. Pleas fill all fields'})
        }
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
        .input("documentoNombre",sql.VarChar,documentoNombre)
        .input("id_articulo",sql.Int,id_articulo)
        .query(`select identificador from asfi_documento where nombre_archivo=@documentoNombre and indicador='A' and id_articulo=@id_articulo`)
        console.log("AQUI ESTA ARRIBA DEL DOCUMENTO EXISTE")
        console.log("VALOR RECORDSET +" +resultDocumentoExiste.recordset[0])
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
            res.status(201).json({message:'Se añadio un nuevo documento'}) 
        }else{
            res.status(401).json({message:"Ya existe documento con el mismo nombre"})           
        }
    }
}catch (err){
    res.status(401).json({message:err}) 
    }
}

const modificarDocumento =async (req,res)=>{
    try{
        const id_articulo=Number(req.params.id_articulo)
        if(isNaN(id_articulo)){
            res.status(401).json({Error:"Incluir un numero de verdad"})
        }
        const {documento,newDocumentoName,descripcion}=req.body
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
                console.log("Aqui estan la ruta : "+resultDocumentoExiste.recordset[0].ruta_archivo)
                await pool
                .request()
                .input("I_proceso",sql.Int,1)
                .input("I_identificador",sql.Int,resultDocumentoExiste.recordset[0]["identificador"])
                .input("I_id_articulo",sql.VarChar,id_articulo)
                .input("I_nombre",sql.VarChar,newDocumentoName)
                .input("I_ruta",sql.VarChar,resultDocumentoExiste.recordset[0].ruta_archivo)
                .input("I_descripcion",sql.VarChar,descripcion)
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

const eliminarDocumentos =async (req,res)=>{
    try{
        const id_articulo=Number(req.params.id_articulo)
        const {nombreDocumento}= req.body
        if(isNaN(id_articulo)){
            res.status(401).json({Error:"Incluir un numero de verdad"})
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
        res.json({message:'articulo con id no existe'})
    }else{
        const resultDocumentoExiste= await pool.request()
        .input("nombreDocumento",sql.Int,nombreDocumento)
        .input("id_articulo",sql.Int,id_articulo)
        .query(`select identificador from asfi_documento where nombre=@nombreDocumento and indicador='A' and id_articulo=@id_articulo`)
        if(!resultDocumentoExiste.recordset[0]){
            res.json({message:"Empresa con seccion no existe o ya dada de alta"})
        }else{
            console.log(resultDocumentoExiste.recordset[0]["identificador"])
            await pool
            .request()
            .input("I_proceso",sql.Int,1)
            .input("I_identificador",sql.Int,resultDocumentoExiste.recordset[0]["identificador"])
            .input("I_id_articulo",sql.VarChar,id_articulo)
            .input("I_nombre",sql.VarChar,nombreDocumento)
            .input("I_ruta",sql.VarChar,"")
            .input("I_descripcion",sql.VarChar,"Dado de alta")
            .input("I_usuario",sql.Int,decoded.id.identificador)
            .input("I_origen",sql.TinyInt,1)
            .output("O_msg_error",sql.VarChar)
            .execute("segabm_documento")
            res.json({message:`Se dio de alt el documento ${nombreDocumento}`})
        }
    }
    }catch (err){
        logger.error(err)
    }
}

//-----------------------UPLOADFILES
// let diskStorage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null,'upload')
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//     },
// })


// let upload = multer({storage:diskStorage}).single('file')
let diskStorage = multer.diskStorage({
    destination: function(req,file,cb){
             cb(null,'upload')
         },
    filename: function(req, file, cb){
      cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname))
    }
})
const maxSize=1*1024*1024 // aprox 1MB
let upload = multer({
    storage:diskStorage,
    fileFilter:(req,file,cb)=>{
        console.log("ENTRO AL FILEFILTER")
        if(file.mimetype =="image/png" || file.mimetype =="application/pdf" && file.originalname.match(/\./g).length<2){
            cb(null,true);
        }else{
            cb(null,false);
            return cb(new Error('Only png o pdf'))
        }
    },
    limits:{fileSize:maxSize}
}).single('file')

const uploadFile= async(req,res,next)=>{
upload (req,res,function (err){
    if(err instanceof multer.MulterError){
        return res.status(501).json({error:err})
    }else if(err){
        return res.status(501).json({error:err})
    }else{
    try{        
        createNewDocumento(req,res)
        console.log(req.file)
    }catch(err){
        res.status(401).json({message:"Error al subir data"})
    }  
    }
})   
}

//--Seleccionar archivos desde la base de datos
const archivos= async(req,res)=>{
    const id_articulo= Number(req.params.id_articulo)
    const pool = await getConnection();
    const filesFromDB = await pool.request()
    .input("id_articulo",sql.Int,id_articulo)
    .query(`select nombre_archivo from asfi_documento where id_articulo=@id_articulo and indicador='A'`)
    return filesFromDB.recordset
}
//
//

const fs = require('fs');

const listaDocumentosId= async (req,res)=>{
    try{
    const filesFromDB=await archivos(req,res)
    console.log(filesFromDB)
    let val=[]
    val= filesFromDB.map(Object=>Object.nombre_archivo)
    const files = fs.readdirSync('upload'); 
    console.log(files)
    //Comparando Arrays
    const nombresIguales=val.filter(Element=>files.includes(Element));
    const newNombresIguales=nombresIguales.map(function(row){
        return {nombre_archivo:row}
    })
    if(nombresIguales.length !== 0){
        res.json(newNombresIguales)
    }else{  
        res.json([])
    }
    }catch(err){
        res.status(401).json({message:"Problemas al descargar"})
    }
}
//DEscargas
const donwloads=async (req,res)=>{
    try{
    filepath=path.join(__dirname,'../../upload') + "\\" + req.body.filename;
    console.log(__dirname  )
    res.sendFile(filepath); 
    }catch(err){
        res.status(401).json({message:"Problemas al descargar"})
    }
}



module.exports={donwloads,uploadFile,listaDocumentosId,getDocumentos,createNewDocumento,modificarDocumento}