const getConnection = require('../database/mssql-db');
const sql=require('mssql/msnodesqlv8');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/App-error');
const path=require('path')
const dotenv= require('dotenv')


//------Token Generator
let refreshToken=[];

const signRefreshToken = id=>{
    return jwt.sign({id},process.env.JWT_SECRET_REFRESH_TOKEN,{
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
    })  
}
const signAccesToken=id=>{
    return jwt.sign({id},process.env.JWT_SECRET_ACCESS_TOKEN,{
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
    })
}
const verificarRefreshToken = async(req, res,next) => {
    let refreshTokenVerificar
    //if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    if(req.body.refreshToken!= undefined && req.body.refreshToken!=null)
    {
        refreshTokenVerificar=req.body.refreshToken
    }else{return res.status(401).json({Message:"valor invalido"})}
    const seEncuentraDentrodetokens=(refreshToken.includes(refreshTokenVerificar))
    if(seEncuentraDentrodetokens==false){
        return res.status(401).json({Message:"REFRESH TOKEN NO ESTA DENTRO DE LA LISTA"})
    }else{
    try{
        const user = jwt.verify(
            refreshTokenVerificar,
            process.env.JWT_SECRET_REFRESH_TOKEN
        );
        const accesToken= await signAccesToken(user.id)
        res.json({
            message:"Se encontro el token",
            accesToken    
        })
    }catch(err){
        return new AppError('Error al verificar refresh Token',401)
    }
}}


////NO OLVIDAR CREAR EL CREATESENDTOKEN EN CREAR NEW USER PERO PREGUNTAR ANTES PARA SABER SI PONER DOS TOKENS UNO DE UN DIA Y EL OTRO DE 2 HORAS PREGUNTAR
const createSendToken = (user,statusCode,res)=>{
    console.log(user.identificador)
    const token=signToken(user.identificador);
    const cookieOptions ={
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN *24*60*60*1000),
        httpOnly:true
    }
    cookieOptions.secure =true;
    res.cookie('jwt',token,cookieOptions);
    res.status(statusCode).json({
        status:'succes',
        token,
        data:{
            user
        }
    })
}

//-------Usuarios
const getUsuarios= async (req,res)=> {
    try{
    const pool= await getConnection();
    const result = await pool
    .request()
    .query('Select * from usuario')
    res.json(result.recordset)}
    catch (err){
        logger.error(err)
    }
}

const getUsuario= async (req,res)=> {
    try{
    const id=req.params.id;
    const pool= await getConnection();
    const result = await pool
    .request()
    .input("identificador",sql.VarChar,id)
    .query('Select * from asfi_usuario where identificador=@identificador')
    res.json(result.recordset)}
    catch (err){
        logger.error(err)
    }
}

const getUserToken = async(req,res)=>{
    try{
        const {username}=req.body
        const pool=await getConnection();
        const result= await pool.request()
        .input("nombres",sql.VarChar,username)//AQUI SE AUMENTA DATOS DEL TOKEN
        .query(`select nombre,identificador from asfi_usuario where nombre=@nombres and indicador='A'`)
        if(!result.recordset[0]){
            res.status(401).json({message:"No se encuentra en la base de datos registrese por favor"})
        }else{
        const valor=result.recordset[0]
        console.log(valor)
        const refrehsToken=signRefreshToken(valor);
        refreshToken.push(refrehsToken)
        const accesToken=signAccesToken(valor)
        
        res.status(200).json({
            status:'succes',
            refrehsToken,
            accesToken,
        
            nombre:result.recordset[0].nombre,
            identificador:result.recordset[0].identificador

        })
    }
}catch(err){
        logger.error(err)
    }
}

const createNewUser =async (req,res)=>{
    try{
     const {nombre,username}=req.body
    if (username.match(/^ *$/) !== null){//Verificar cuando tenga espacios igual preguntar**
        return res.status(400).json({msg:'Bad request. Pleas fill all fields'})
    }
    const pool = await getConnection();
    const result= await pool
    .request()
    .input("nombreUsuario",sql.VarChar,username)
    .query(`select identificador from asfi_usuario where nombre=@nombreUsuario and indicador='A'`)
    if(!result.recordset[0]){
        await pool
        .request()
        .input("I_proceso",sql.Int,0)
        .input("I_identificador",sql.Int,1)
        .input("I_nombre",sql.VarChar,username)
        .input("I_usuario",sql.Int,1)
        .output("O_msg_error",sql.VarChar)
        .execute("segabm_usuarios")
        res.json({
            result:{
                nombre,
                username
            }
        })
       
    }else{
        res.json({message:"Ya existe el Usuario dentro de la DB"})
    }
}catch (err){
        logger.error(err)
    }
}

const modificarUser =async (req,res)=>{
    try{
    const {username,newUsername}=req.body
    if (username.match(/^ *$/) !== null || newUsername.match(/^ *$/) !== null || username==newUsername){//Verificar cuando tenga espacios igual preguntar**
        return res.status(400).json({msg:'Bad request. Pleas fill all fields or similar fields where requested'})
    }
    
    const pool = await getConnection();
    const result= await pool
    .request()
    .input("nombreUsuario",sql.VarChar,username)
    .query(`select identificador from asfi_usuario where nombre=@nombreUsuario and indicador='A'`)
    if(!result.recordset[0]){
        res.json({message: "Usuario no existe"})
    }else{
    await pool
    .request()
    .input("I_proceso",sql.Int,1)
    .input("I_identificador",sql.Int,result.recordset[0]["identificador"])
    .input("I_nombre",sql.VarChar,newUsername)
    .input("I_usuario",sql.Int,1)
    
    .output("O_msg_error",sql.VarChar)
    .execute("segabm_usuarios")
    res.status(200).json({
        message: 'Se cambio el valor del usuario'
    })
    }
}catch (err){
        logger.error(err)
    }
}

const buscarId= async(identificador)=>{
    try{
        const pool=await getConnection();
        const result= await pool.request()
        .input("identificador",sql.VarChar,identificador)
        .query(`select identificador from asfi_usuario where identificador=@identificador and indicador='A'`)
        return result.recordset[0]
    }catch(err){
        logger.error(err)
    }
}

//---------------------------------DOCUMENTOS--------------------------

// //----------------
module.exports={getUsuarios,getUsuario,createNewUser,getUserToken,buscarId,modificarUser,verificarRefreshToken};
