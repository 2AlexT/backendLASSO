const ldap=require('ldapjs');
const path=require('path')
const AppError=require('../utils/App-error')
const logger=require('../utils/logger');
const jwt = require('jsonwebtoken')
const {decode}= require('punycode')
const mssqlController=require('./user-controller');
const { promisify } = require('util');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


//-------LDAP AUTH
const client = ldap.createClient({
    url:process.env.URL_LDAP,
    reconnect: true
});

exports.login=async(req,res,next)=>{
    const{nombre}=req.body
    //Que ponga datos
    if(!nombre){
        return next(new AppError('Porfa poner usuario AD',400))
    }
    //Si existe el usuario en LDAP
    client.bind("Dilan Alexander Peredo Flores","Turning point@",function(err){
        if(err){
            logger.error(err)
            return next(new AppError('Error al conectarse al ldap',400))
        }else{
           
        }
    })
    let patern= /["//"]/g;
    try{  
         const nombreBuscado= await buscar(nombre)
         const newNombre=nombreBuscado.replace(patern,"")
         req.body={nombre:newNombre,
              username:nombre  }
        next();
        await this.close()
    }catch(err){
        logger.error("Error en el login AD incorrecto")
        return next(new AppError('No se encuentra dentro del dominio :'+err,401))
    }
}

function buscar(nombre)
{   
 
    return new Promise(function(resolve,reject){
        client.search('DC=corp,DC=fassil,DC=com,DC=bo', 
        {   filter: `(sAMAccountName=${nombre})`,
            scope: 'sub',
            attributes: ['cn','mail']}
        , (err, res) => {
            if(err){
                return new AppError('Error en unirse al search ldap :=>'+err.message,400)
            }else{
                //-----------
                res.on('searchEntry', (entry) =>{ 
                   resolve(JSON.stringify(entry.object.cn))
                });
                  res.on('error', (err) => {
                    if(err){
                        return new AppError('Error en la busqueda :=>'+ err.message,400)
                    }
                    
                });
                res.on('end', (result) => {
                    if(err){
                        return new AppError('Error en unirse al search ldap :=>'+ err.message,400)
                    }
                        resolve()
                });
            }
        });
    })
   
}


exports.close =async()=>{
    client.unbind()
}

exports.protect = async(req,res,next)=>{
    let token 
    try{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token=req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(new AppError('No estas logeado',401));
    }
    //Verificamos el token
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET_ACCESS_TOKEN)
    console.log(decoded)
    let currentUser = await mssqlController.buscarId(decoded.id.identificador)
    if(!currentUser){
        return next(new AppError('Usuario con token no existe',401))
    }
    
    // if(currentUser.changePasswordAfter(decoded.iat)){
    //     return next(new AppError('usuario cambio la contraseña o hizo algun cambio al token, log again ',401))
    // }
    next();
}catch(err){
    logger.error(err)
    return next(new AppError('Token expirado o incorrecto, no puede pasar el protect',401))
}
}

client.on('error', (err) => {
    return new AppError('Se encontro un error en el cliente ldap : ' + err,400) // this will be your ECONNRESET message
  })