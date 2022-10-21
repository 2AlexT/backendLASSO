const getConnection = require('../database/mssql-db');
const sql=require('mssql/msnodesqlv8');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/App-error');
const path=require('path')
const dotenv= require('dotenv')
const { promisify } = require('util');


const getEmpresa= async (req,res)=> {
    try{
    const empresa=req.params.empresa;
    const pool= await getConnection();
    const result = await pool
    .request()
    .input("nombre",sql.VarChar,empresa)
    .query(`Select * from asfi_empresa where indicador='A'`)
    if(!result.recordset[0]){
        res.json({Message:"No existe empresa"})
    }else{

        res.json(result.recordset)
    }
}catch (err){
        logger.error(err)
    }

}



const createNewEmpresa =async (req,res,next)=>{
    try{
     const {nombreEmpresa}=req.body
    if (nombreEmpresa.match(/^ *$/) !== null){
        return res.status(400).json({msg:'Bad request. Pleas fill all fields'})
    }
    const pool = await getConnection();
    let token=req.headers.authorization.split(' ')[1];
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET_ACCESS_TOKEN)
    console.log(decoded.id.identificador)
    const result = await pool.request()
    .input("nombreEmpresa",sql.VarChar,nombreEmpresa)
    .query(`select identificador from asfi_empresa where nombre=@nombreEmpresa and indicador='A'`)
    if(!result.recordset[0]){
        console.log(decoded.id.identificado)
        await pool
        .request()
        .input("I_proceso",sql.Int,0)
        .input("I_identificador",sql.Int,0)
        .input("I_nombre",sql.VarChar,nombreEmpresa)
        .input("I_usuario",sql.Int,decoded.id.identificador)
        .input("I_origen",sql.Int,0)
        .output("O_msg_error",sql.VarChar)
        .execute("segabm_empresa")
        res.json({message:'Se creo nueva empresa'})
    }else{
        res.json({message:'Ya existe la empresa'})
    }
    }catch (err){
        logger.error(err)
    }
}

const modificarEmpresa =async (req,res)=>{
    try{
     const {nombreEmpresa,newNombreEmpresa}=req.body
    if (nombreEmpresa.match(/^ *$/) !== null || newNombreEmpresa.match(/^ *$/) !== null){//Verificar cuando tenga espacios igual preguntar**
        return res.status(400).json({msg:'Bad request. Pleas fill all fields'})
    }
    const pool = await getConnection();
    token=req.headers.authorization.split(' ')[1];
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET_ACCESS_TOKEN)
    console.log(decoded.id.identificador)
    const result = await pool.request()
    .input("nombreEmpresa",sql.VarChar,nombreEmpresa)
    .query(`select identificador from asfi_empresa where nombre=@nombreEmpresa and indicador='A'`)
    if(!result.recordset[0]){
        res.json({mess:'No se encuentra la empresa'})
    }else{
    await pool
    .request()
    .input("I_proceso",sql.Int,1)
    .input("I_identificador",sql.Int,result.recordset[0]["identificador"])
    .input("I_nombre",sql.VarChar,newNombreEmpresa)
    .input("I_usuario",sql.Int,decoded.id.identificador)
    .input("I_origen",sql.Int,0)
    .output("O_msg_error",sql.VarChar)
    .execute("segabm_empresa")
   
    res.json({
        result:{message: `Empresa ${nombreEmpresa} paso a ser : ${newNombreEmpresa}`}
    }) 
}
    }catch (err){
        logger.error(err)
    }
}


const darDeAltaEmpresa =async (req,res)=>{
    try{
     const {nombreEmpresa}=req.body
    if (nombreEmpresa.match(/^ *$/) !== null){//Verificar cuando tenga espacios igual preguntar**
        return res.status(400).json({msg:'Bad request. Pleas fill all fields'})
    }
    const pool = await getConnection();
    token=req.headers.authorization.split(' ')[1];
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET_ACCESS_TOKEN)
    console.log(decoded.id.identificador)
    const result = await pool.request()
    .input("nombreEmpresa",sql.VarChar,nombreEmpresa)
    .query(`select identificador from asfi_empresa where nombre=@nombreEmpresa and indicador='A'`)
    if(!result.recordset[0]){
        res.json({mess:'Empresa ya dada de baja'})
    }else{
        
    await pool
    .request()
    .input("I_proceso",sql.Int,2)
    .input("I_identificador",sql.Int,result.recordset[0]["identificador"])
    .input("I_nombre",sql.VarChar,nombreEmpresa)
    .input("I_usuario",sql.Int,decoded.id.identificador)
    .input("I_origen",sql.Int,0)
    .output("O_msg_error",sql.VarChar)
    .execute("segabm_empresa")
   
    res.json({
        result:{message: `Empresa ${nombreEmpresa} dada de baja`}
    }) 
}
    }catch (err){
        logger.error(err)
    }
}

module.exports={createNewEmpresa,darDeAltaEmpresa,modificarEmpresa,getEmpresa}