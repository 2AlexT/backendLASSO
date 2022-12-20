const getConnection = require('../database/mssql-db');
const sql=require('mssql/msnodesqlv8');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/App-error');
const path=require('path')
const dotenv= require('dotenv')
const { promisify } = require('util');


//-----------------------SECCIONEES -----------------------------------------------
const getSecciones= async (req,res)=> {
    try{
    const id_gestion= req.params.id_gestion
    if(id_gestion===undefined){
        return res.json({message:"Error"})
    }
    const pool= await getConnection();
    const result = await pool
    .request()
    .input("id_gestion",sql.VarChar,id_gestion)
    .query(`Select * from asfi_seccion where id_gestion=@id_gestion and indicador='A'`)
    
    if(!result.recordset[0]){
        res.json({Message:"No existe secciones en la gestion"})
    }else{
        res.json(result.recordset)
    }
}catch (err){
        logger.error(err)
    }
}
const getSeccion= async (req,res)=> {
    try{
    const id_gestion=req.params.id_gestion;
    const id_seccion=req.params.id_seccion
    const pool= await getConnection();
    const result = await pool
    .request()
    .input("id_gestion",sql.VarChar,id_gestion)
    .input("id_seccion",sql.VarChar,id_seccion)
    .query('Select * from asfi_seccion where identificador=@id_seccion and id_gestion=@id_gestion')
    res.json(result.recordset)}
    catch (err){
        logger.error(err)
    }
}

const createNewSeccion =async (req,res,next)=>{
    try{
        const id_gestion=Number(req.params.id_gestion)
        if(isNaN(id_gestion)){
            res.status(401).json({Error:"Incluir un numero de verdad"})
        }
        const {seccion}=req.body
        if (typeof(seccion)!== 'number'){
            return res.status(400).json({msg:'Bad request. Pleas fill all fields'})
        }
        let token=req.headers.authorization.split(' ')[1];
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET_ACCESS_TOKEN)
        console.log(decoded.id.identificador)
    const pool = await getConnection();
    const resultGestionExiste = await pool.request()
    .input("id_gestion",sql.VarChar,id_gestion)
    .query(`select identificador from asfi_gestion where identificador=@id_gestion and indicador='A'`)
    console.log(resultGestionExiste.recordset[0])
    //Averiguar sobre id empresa y nombre empresa
    if(!resultGestionExiste.recordset[0]){
        res.status(401).json({message:'Gestion inexistente'})
    }else{
        const resultSeccionExiste= await pool.request()
        .input("seccion",sql.Int,seccion)
        .input("id_gestion",sql.Int,id_gestion)
        .query(`select identificador from asfi_seccion where seccion=@seccion and indicador='A' and id_gestion=@id_gestion`)
        console.log(resultGestionExiste.recordset[0])
        if(!resultSeccionExiste.recordset[0]){
            await pool
            .request()
            .input("I_proceso",sql.Int,0)
            .input("I_identificador",sql.Int,0)
            .input("I_id_gestion",sql.VarChar,id_gestion)
            .input("I_seccion",sql.Int,seccion)
            .input("I_usuario",sql.Int,decoded.id.identificador)
            .input("I_origen",sql.Int,0)
            .output("O_msg_error",sql.VarChar)
            .execute("segabm_seccion")
            res.json({message:'Se creo nueva seccion'}) 
        }else{
            res.status(401).json({message:"Ya existe seccion dentro de la gestion"})           
        }
    }
}catch (err){
        logger.error(err)
    }
}

containsObjectSeccion=(obj, list)=> {
    let i; let val=false
    for (i = 0; i < list.length; i++) {
        if (list[i].seccion == obj) {
            val= true;
        }
    }
    return val
}

const modificarSeccion =async (req,res)=>{
    try{
        const id_gestion=Number(req.params.id_gestion)
        const id_seccion=Number(req.params.id_seccion)
        if(isNaN(id_gestion)){
            res.status(401).json({Error:"Incluir un numero de verdad"})
        }
        const {seccion}=req.body
        if (typeof(id_seccion)!== 'number' || typeof(seccion)!== 'number'){
            return res.status(400).json({msg:'Bad request. Pleas fill all fields'})
        }
        token=req.headers.authorization.split(' ')[1];
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET_ACCESS_TOKEN)
        console.log(decoded.id.identificador)
    const pool = await getConnection();
    const resultGestionExiste = await pool.request()
    .input("id_gestion",sql.Int,id_gestion)
    .query(`select identificador from asfi_gestion where identificador=@id_gestion and indicador='A'`)
    //Averiguar sobre id empresa y nombre empresa
    if(!resultGestionExiste.recordset[0]){
        res.json({message:'Gestion con id no existe'})
    }else{
        const resultSeccionExiste= await pool.request()
        .input("id_seccion",sql.VarChar,id_seccion)
        .input("id_gestion",sql.VarChar,id_gestion)
        .query(`select * from asfi_seccion where identificador=@id_seccion and indicador='A' and id_gestion=@id_gestion`)
        seccionNombre=resultSeccionExiste.recordset[0]["seccion"]
        const listaNombresSeccion=await pool.request()
        .input("seccionNombre",sql.VarChar,seccionNombre)
        .query(`select seccion from asfi_seccion where indicador='A' and identificador!=@seccionNombre`)
        
        if(!resultSeccionExiste.recordset[0]){
            res.json({message:"Gestion con secciones no existe"})
        }else{
                if(containsObjectSeccion(seccion,listaNombresSeccion.recordset)){
                    res.status(402).json({message:"Seccion tiene mismo nombre a otros"})
                }else{
                await pool
                .request()
                .input("I_proceso",sql.Int,1)
                .input("I_identificador",sql.Int,resultSeccionExiste.recordset[0]["identificador"])
                .input("I_id_gestion",sql.VarChar,id_gestion)
                .input("I_seccion",sql.Int,seccion)
                .input("I_usuario",sql.Int,decoded.id.identificador)
                .input("I_origen",sql.Int,0)
                .output("O_msg_error",sql.VarChar)
                .execute("segabm_seccion")
                res.json({message:`Se modifico la seccion :'${resultSeccionExiste.recordset[0]["seccion"]}' a la siguiente ${seccion}`})
        }    }
    }
}catch (err){
        console.log(err)
    }
}


const darAltaSeccion =async (req,res)=>{
    try{
        const id_gestion=Number(req.params.id_gestion)
        const id_seccion=Number(req.params.id_seccion)
        if(isNaN(id_gestion) ||typeof(id_seccion)!== 'number'){
            res.status(401).json({Error:"Incluir un numero de verdad"})
        }
        token=req.headers.authorization.split(' ')[1];
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET_ACCESS_TOKEN)
        console.log(decoded.id.identificador)
    const pool = await getConnection();
    const resultGestionActiva = await pool.request()
    .input("id_gestion",sql.Int,id_gestion)
    .query(`select * from asfi_gestion where identificador=@id_gestion and indicador='A'`)
    //Averiguar sobre id empresa y nombre empresa
    
    if(!resultGestionActiva.recordset[0]){
        res.json({message:'Gestion con id no existe'})
    }else{

        const resultSeccionExiste= await pool.request()
        .input("id_gestion",sql.Int,id_gestion)
        .input("id_seccion",sql.Int,id_seccion)
        .query(`select * from asfi_seccion where identificador=@id_seccion and indicador='A' and id_gestion=@id_gestion`)
        if(!resultSeccionExiste.recordset[0]){
            res.json({message:"Empresa con seccion no existe o ya dada de alta"})
        }else{
            await pool
            .request()
            .input("I_proceso",sql.Int,2)
            .input("I_identificador",sql.Int,resultSeccionExiste.recordset[0]["identificador"])
            .input("I_id_gestion",sql.VarChar,id_gestion)
            .input("I_seccion",sql.Int,resultSeccionExiste.recordset[0]["seccion"])
            .input("I_usuario",sql.Int,decoded.id.identificador)
            .input("I_origen",sql.Int,0)
            .output("O_msg_error",sql.VarChar)
            .execute("segabm_seccion")
            res.json({message:`Se dio de alta la seccion ${resultSeccionExiste.recordset[0]["seccion"]} de la gestion`})
        }
    }
    }catch (err){
        logger.error(err)
        console.log(err)
    }
}

module.exports={getSecciones,createNewSeccion,modificarSeccion,darAltaSeccion,getSeccion}