const getConnection = require('../database/mssql-db');
const sql=require('mssql/msnodesqlv8');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/App-error');
const path=require('path')
const dotenv= require('dotenv')
const { promisify } = require('util');

////-----GESTIOOOONES

const getAllGestiones= async (req,res)=> {
    try{
    const pool= await getConnection();
    const result = await pool
    .request()
    .query(`Select * from asfi_gestion where indicador='A'`)
    if(!result.recordset[0]){
        res.json({Message:"No existe gestiones con esa empresa"})
    }else{
        res.json(result.recordset)
    }
}catch (err){
        logger.error(err)
    }
}

const getGestiones= async (req,res)=> {
    try{
    const id_empresa= req.params.id_empresa
    const pool= await getConnection();
    const result = await pool
    .request()
    .input("id_empresa",sql.VarChar,id_empresa)
    .query(`Select * from asfi_gestion where id_empresa=@id_empresa and indicador='A'`)
    if(!result.recordset[0]){
        res.json({Message:"No existe gestiones con esa empresa"})
    }else{
        res.json(result.recordset)
    }
}catch (err){
        logger.error(err)
    }
}

const createNewGestion =async (req,res)=>{
    try{
        const id_empresa=Number(req.params.id_empresa)
        if(isNaN(id_empresa)){
            res.status(401).json({Error:"Incluir un numero de verdad"})
        }
        const {gestion}=req.body
        if (typeof(gestion)!== 'number'){
            return res.status(400).json({msg:'Bad request. Pleas fill all fields'})
        }
    let token=req.headers.authorization.split(' ')[1];
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET_ACCESS_TOKEN)
    console.log(decoded.id.identificador)
    const pool = await getConnection();
    const resultNombreEmpresa = await pool.request()
    .input("id_empresa",sql.VarChar,id_empresa)
    .query(`select * from asfi_empresa where identificador=@id_empresa and indicador='A'`)
    //Averiguar sobre id empresa y nombre empresa
    if(!resultNombreEmpresa.recordset[0]){     
        res.json({message:'Empresa con id no existe'})
    }else{
        const resultGestionExiste= await pool.request()
        .input("gestion",sql.VarChar,gestion)
        .input("id_empresa",sql.VarChar,id_empresa)
        .query(`select * from asfi_gestion where gestion=@gestion and indicador='A' and id_empresa=@id_empresa`)
        if(!resultGestionExiste.recordset[0]){
            await pool
            .request()
            .input("I_proceso",sql.Int,0)
            .input("I_identificador",sql.Int,id_empresa)
            .input("I_id_empresa",sql.Int,id_empresa)
            .input("I_gestion",sql.Int,gestion)
            .input("I_usuario",sql.Int,decoded.id.identificador)
            .input("I_origen",sql.Int,0)
            .output("O_msg_error",sql.VarChar)
            .execute("segabm_gestion")
            res.json({message:'Se creo nueva gestion'})
        }else{
            res.json({message:"Empresa con misma gestion ya existe"})
        }
    }
    }catch (err){
        logger.error(err)
    }
}

const modificarGestion =async (req,res,next)=>{
    try{
        const id_empresa=Number(req.params.id_empresa)
        const id_gestion=Number(req.params.id_gestion)
        if(isNaN(id_empresa)){
            res.status(401).json({Error:"Incluir un numero de verdad"})
        }
        const {gestion}=req.body
        if (typeof(id_gestion)!== 'number' || typeof(gestion)!== 'number'){
            return res.status(400).json({msg:'Bad request. Pleas fill all fields'})
        }
        token=req.headers.authorization.split(' ')[1];
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET_ACCESS_TOKEN)
        console.log(decoded.id.identificador)
    const pool = await getConnection();
    const resultNombreEmpresa = await pool.request()
    .input("id_empresa",sql.VarChar,id_empresa)
    .query(`select identificador from asfi_empresa where identificador=@id_empresa and indicador='A'`)
    console.log(resultNombreEmpresa.recordset[0])
    //Averiguar sobre id empresa y nombre empresa
    if(!resultNombreEmpresa.recordset[0]){
        res.json({message:'Empresa con id no existe'})
    }else{
        const resultGestionExiste= await pool.request()
        .input("id_gestion",sql.VarChar,id_gestion)
        .input("id_empresa",sql.VarChar,id_empresa)
        .query(`select * from asfi_gestion where identificador=@id_gestion and indicador='A' and id_empresa=@id_empresa`)
        if(!resultGestionExiste.recordset[0]){
            res.json({message:"Empresa con gestion no existe"})
        }else{
            const resultNewGestionExiste= await pool.request()
            .input("gestion",sql.VarChar,gestion)
            .input("id_empresa",sql.VarChar,id_empresa)
            .query(`select * from asfi_gestion where gestion=@gestion and indicador='A' and id_empresa=@id_empresa`)
            if(!resultNewGestionExiste.recordset[0]){
                await pool
                .request()
                .input("I_proceso",sql.Int,1)
                .input("I_identificador",sql.Int,id_gestion)
                .input("I_id_empresa",sql.VarChar,id_empresa)
                .input("I_gestion",sql.Int,gestion)
                .input("I_usuario",sql.Int,decoded.id.identificador)
                .input("I_origen",sql.Int,0)
                .output("O_msg_error",sql.VarChar)
                .execute("segabm_gestion")
                res.json({message:`Se modifico la gestion con identificador :'${id_gestion}' a la siguiente ${gestion}`})
            }else{
                res.json({message:"Valor a modificar ya existe dentro de la empresa"})
           
        }
    }
}
    }catch (err){
        logger.error(err)
    }
}

const gestionDarAlta =async (req,res,next)=>{
    try{
        const id_empresa=Number(req.params.id_empresa)
        const id_gestion=Number(req.params.id_gestion)
        if(isNaN(id_empresa)){
            res.status(401).json({Error:"Incluir un numero de verdad"})
        }
        if (typeof(id_gestion)!== 'number'){
            return res.status(400).json({msg:'Bad request. Pleas fill all fields'})
        }
        token=req.headers.authorization.split(' ')[1];
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET_ACCESS_TOKEN)
        console.log(decoded.id.identificador)
    const pool = await getConnection();
    const resultNombreEmpresa = await pool.request()
    .input("id_empresa",sql.Int,id_empresa)
    .query(`select identificador from asfi_empresa where identificador=@id_empresa and indicador='A'`)
    //Averiguar sobre id empresa y nombre empresa
    if(!resultNombreEmpresa.recordset[0]){
        res.json({message:'Empresa con id no existe'})
    }else{
        const resultGestionExiste= await pool.request()
        .input("id_gestion",sql.Int,id_gestion)
        .input("id_empresa",sql.Int,id_empresa)
        .query(`select * from asfi_gestion where identificador=@id_gestion and indicador='A' and id_empresa=@id_empresa`)
        if(!resultGestionExiste.recordset[0]){
            res.json({message:"Empresa con gestion no existe"})
        }else{
            console.log(resultGestionExiste.recordset[0])
            await pool
            .request()
            .input("I_proceso",sql.Int,2)
            .input("I_identificador",sql.Int,id_gestion)
            .input("I_id_empresa",sql.VarChar,id_empresa)
            .input("I_gestion",sql.Int,resultGestionExiste.recordset[0]["gestion"])
            .input("I_usuario",sql.Int,decoded.id.identificador)
            .input("I_origen",sql.Int,0)
            .output("O_msg_error",sql.VarChar)
            .execute("segabm_gestion")
            res.json({message:`Se dio de alta la gestion :${resultGestionExiste.recordset[0]["gestion"]} de la empresa`})
        }
    }
    }catch (err){
        logger.error(err)
        res.status(301).json({message:err})
    }
}

module.exports={getAllGestiones,getGestiones,createNewGestion,modificarGestion,gestionDarAlta}