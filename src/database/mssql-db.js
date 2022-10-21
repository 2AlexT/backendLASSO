require('dotenv').config();
const sql=require('mssql/msnodesqlv8');
const connConfig = require('../config/db.config');
const logger = require('../utils/logger');
const config ={
    server: connConfig.MSSQL.SERVER,
    database:connConfig.MSSQL.DB,
    driver:'msnodesqlv8',
    options:{
        encrypt: false,
        trustedConnection: true
    }
}
async function getConnection(){
    try {
        const pool= await sql.connect(config);
        logger.info('retornar pool cuando se llame de funcion')
        return pool 
    }catch (err){
        logger.error(err)    
    }
}
getConnection()
module.exports=getConnection;