const dotenv =require('dotenv');
const logger = require('./src/utils/logger');
const app = require('./index')


process.on('uncaughtException' , err=>{
    logger.error('Unhandle Rejection!!!');
    logger.error(err);
    process.exit(1);
})

const port = process.env.PORT || 8080;
const server=  app.listen(port, ()=>{
 //  logger.info(`server running on ${port}`)
})

process.on('unhandledRejection' , err=>{
    logger.error('Unhandle Rejection!!!');
    logger.error(err);
    server.close(()=>{
        process.exit(1);
    })
   
})