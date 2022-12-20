const getConnection = require('../database/mssql-db');
const sql=require('mssql/msnodesqlv8');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/App-error');
const path=require('path')
const dotenv= require('dotenv')
const { promisify } = require('util');
const userController = require('./user-controller')








permit=(...permittedRoles)=>{
    return async (req,res,next)=>{
        try{
         token=req.headers.authorization.split(' ')[1];
         const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET_ACCESS_TOKEN)
         console.log(decoded)
         let currentUser = await userController.buscarId(decoded.id.identificador)
         if(!currentUser){
          return next(new AppError('Usuario con token no existe',401))
                }           
            console.log(decoded)
            //CHEQUEAR SIEMPRE Y PREGUNATAR COMO AÑADIR ROL A LA BASE DE DATOS 
            if("" && permittedRoles.includes("") ){
               next();

       }else{
            res.status(403).json({message:"Forbidden"})
             }
        }catch(err){
             console.log(err)
            }
        }}

module.exports={permit}

