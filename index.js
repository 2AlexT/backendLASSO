const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser')
const UserRoute = require('./src/routes/user-route')
const PruebaRoute=require('./src/routes/pruebas-route')
const globalErrorHandler = require('./src/controller/error-controller')
const logger = require('./src/utils/logger');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean')
const hpp =require('hpp');
const AppError = require('./src/utils/App-error');
const bcrypt =require('bcryptjs')
const empresaRouter =require('./src/routes/empresa-route');
const refreshRouter=require('./src/routes/refresh-token-route')
const gestionRoute=require('./src/routes/gestion-route')
const seccionRoute=require('./src/routes/seccion-route')
const articuloRoute=require('./src/routes/articulo-route')
const documentoRoute=require('./src/routes/documentos-route')
//---------
const app = express();
const limiter = rateLimit({
   max:100,
   windowMS:60*60*1000,
   message:'Demasiados request del mismo IP. Vuelva a intentar mas tarde'
})
app.use('/api/login',limiter)

//middlewares
// const expresssas= express.json()
// if(expresssas && expresssas.urlencoded === 'deprecated'){
//    console.log('deprecado')
// }else{
//    console.log('Funciona bien')
// }
app.use(express.json({limit:'10kb'}));
app.use(express.urlencoded({extended:false}))
app.use(xss());
app.use(hpp());
app.use(helmet());
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

app.get('/',(req,res)=>{
   res.status(200).render('base')
})

//app  ROUTEs
app.use('/api/v1/',PruebaRoute,empresaRouter,UserRoute,refreshRouter,gestionRoute,seccionRoute,articuloRoute,documentoRoute)


app.all('*',(req,res,next)=>{
   next(new AppError(`No se puede encontrar ${req.originalUrl} url en el server`,404))
})
app.use(globalErrorHandler)

//-----------------------



module.exports=app;

