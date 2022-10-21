const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const config = require("../config/log-config.json");

const timezoned = () =>{
    return new Date().toLocaleString('es-ES',{
        //Leer lo del archivo ENV o config
        timeZone:'America/La_Paz'
    })
}

const logFormat = winston.format.combine(
 winston.format.colorize(),
 winston.format.timestamp({format:timezoned}),
 winston.format.align(),
 winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`,),);
const transport = new DailyRotateFile({
 filename: config.logConfig.logFolder + config.logConfig.logFile,
 datePattern: "YYYY-MM-DD",
 zippedArchive: true,
 maxSize: "20m",
 maxFiles: "24d",
 prepend: true,
level: config.logConfig.logLevel,
});
transport.on("rotate", function (oldFilename, newFilename) {
// call function like upload to s3 or on cloud
});
const logger = winston.createLogger({
format: logFormat,
transports: [
     transport,
     new winston.transports.Console({
           level: "info"    ,}),
]});
module.exports = logger;