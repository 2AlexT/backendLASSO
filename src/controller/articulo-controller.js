const getConnection = require('../database/mssql-db');
const sql=require('mssql/msnodesqlv8');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/App-error');
const path=require('path')
const dotenv= require('dotenv')
const { promisify } = require('util');



//---------------------Articulos---------------------------

const getArticulo= async (req,res)=> {
    try{
    const id_seccion= req.params.id_seccion
    const pool= await getConnection();
    const result = await pool
    .request()
    .input("id_seccion",sql.VarChar,id_seccion)
    .query(`Select * from asfi_articulo where id_seccion=@id_seccion and indicador='A'`)
    if(!result.recordset[0]){
        res.json({Message:"No existe articulo en la seccion"})
    }else{
        res.json(result.recordset)
    }
}catch (err){
        logger.error(err)
    }
}


const createNewArticulo =async (req,res)=>{
    try{
        const id_seccion=Number(req.params.id_seccion)
        if(isNaN(id_seccion)){
            res.status(401).json({Error:"Incluir un numero de verdad"})
        }
        const {articulo}=req.body
        if (typeof(articulo)!== 'number'){
            return res.status(400).json({msg:'Bad request. Pleas fill all fields'})
        }
        let token=req.headers.authorization.split(' ')[1];
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET_ACCESS_TOKEN)
        console.log(decoded.id.identificador)
    const pool = await getConnection();
    const resultSeccionExiste = await pool.request()
    .input("id_seccion",sql.Int,id_seccion)
    .query(`select identificador from asfi_seccion where identificador=@id_seccion and indicador='A'`)
    //Averiguar sobre id empresa y nombre empresa
    if(!resultSeccionExiste.recordset[0]){
        res.status(401).json({message:'Seccion inexistente'})
    }else{
        const resultArticuloExiste= await pool.request()
        .input("articulo",sql.Int,articulo)
        .input("id_seccion",sql.Int,id_seccion)
        .query(`select identificador from asfi_articulo where articulo=@articulo and indicador='A' and id_seccion=@id_seccion`)
        console.log(resultArticuloExiste.recordset[0])
        if(!resultArticuloExiste.recordset[0]){
            await pool
            .request()
            .input("I_proceso",sql.Int,0)
            .input("I_identificador",sql.Int,0)
            .input("I_id_seccion",sql.VarChar,id_seccion)
            .input("I_articulo",sql.Int,articulo)
            .input("I_usuario",sql.Int,decoded.id.identificador)
            .input("I_origen",sql.Int,0)
            .output("O_msg_error",sql.VarChar)
            .execute("segabm_articulo")
            res.json({message:'Se creo nueva articulo'}) 
        }else{
            res.status(401).json({message:"Ya existe articulo dentro de la seccion"})           
        }
    }
}catch (err){
        logger.error(err)
    }
}



const modificarArticulo =async (req,res)=>{
    try{
        const id_seccion=Number(req.params.id_seccion)
        if(isNaN(id_seccion)){
            res.status(401).json({Error:"Incluir un numero de verdad"})
        }
        const {articulo,newArticulo}=req.body
        if (typeof(articulo)!== 'number' || typeof(newArticulo)!== 'number' || articulo===newArticulo){
            return res.status(400).json({msg:'Bad request. Pleas fill all fields'})
        }
        token=req.headers.authorization.split(' ')[1];
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET_ACCESS_TOKEN)
        console.log(decoded.id.identificador)
    const pool = await getConnection();
    const resultSeccionExiste = await pool.request()
    .input("id_seccion",sql.Int,id_seccion)
    .query(`select identificador from asfi_seccion where identificador=@id_seccion and indicador='A'`)
    //Averiguar sobre id empresa y nombre empresa
    if(!resultSeccionExiste.recordset[0]){
        res.json({message:'seccion con id no existe'})
    }else{
        const resultArticuloExiste= await pool.request()
        .input("articulo",sql.Int,articulo)
        .input("id_seccion",sql.Int,id_seccion)
        .query(`select * from asfi_articulo where articulo=@articulo and indicador='A' and id_seccion=@id_seccion`)
        if(!resultArticuloExiste.recordset[0]){
            res.json({message:"Seccion con articulo no existe"})
        }else{
                await pool
                .request()
                .input("I_proceso",sql.Int,1)
                .input("I_identificador",sql.Int,resultArticuloExiste.recordset[0]["identificador"])
                .input("I_id_seccion",sql.VarChar,id_seccion)
                .input("I_articulo",sql.Int,newArticulo)
                .input("I_usuario",sql.Int,decoded.id.identificador)
                .input("I_origen",sql.Int,0)
                .output("O_msg_error",sql.VarChar)
                .execute("segabm_articulo")
                res.json({message:`Se modifico el articulo :'${articulo}' al siguiente valor :${newArticulo}`})
        }
    }
}catch (err){
        logger.error(err)
    }
}


const articuloDarDeAlta =async (req,res)=>{
    try{
        const id_seccion=Number(req.params.id_seccion)
        if(isNaN(id_seccion)){
            res.status(401).json({Error:"Incluir un numero de verdad"})
        }
        const {articulo}=req.body
        if (typeof(articulo)!== 'number'){
            return res.status(400).json({msg:'Bad request. Pleas fill all fields'})
        }
        token=req.headers.authorization.split(' ')[1];
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET_ACCESS_TOKEN)
        console.log(decoded.id.identificador)
    const pool = await getConnection();
    const resultSeccionActiva = await pool.request()
    .input("id_seccion",sql.Int,id_seccion)
    .query(`select identificador from asfi_seccion where identificador=@id_seccion and indicador='A'`)
    //Averiguar sobre id empresa y nombre empresa
    if(!resultSeccionActiva.recordset[0]){
        res.json({message:'Seccion con id no existe'})
    }else{
        const resultArticuloExiste= await pool.request()
        .input("articulo",sql.Int,articulo)
        .input("id_seccion",sql.Int,id_seccion)
        .query(`select identificador from asfi_articulo where articulo=@articulo and indicador='A' and id_seccion=@id_seccion`)
        if(!resultArticuloExiste.recordset[0]){
            res.json({message:"Seccion con articulo no existe o ya dada de alta"})
        }else{
            console.log(resultArticuloExiste.recordset[0]["identificador"])
            await pool
            .request()
            .input("I_proceso",sql.Int,2)
            .input("I_identificador",sql.Int,resultArticuloExiste.recordset[0]["identificador"])
            .input("I_id_seccion",sql.VarChar,id_seccion)
            .input("I_articulo",sql.Int,articulo)
            .input("I_usuario",sql.Int,decoded.id.identificador)
            .input("I_origen",sql.Int,0)
            .output("O_msg_error",sql.VarChar)
            .execute("segabm_articulo")
            res.json({message:`Se dio de alta la gestion : '${articulo}' de la empresa`})
        }
    }
    }catch (err){
        logger.error(err)
    }
}
module.exports={getArticulo,createNewArticulo,modificarArticulo,articuloDarDeAlta}