const nodemailer = require('nodemailer');
const nodemailerSenggrid = require('nodemailer-sendgrid');
const dotenv=require('dotenv').config()
const path =require('path')
const sgMail = require('@sendgrid/mail')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const createTrans=()=>{
    const transport = nodemailer.createTransport({
        host:'svrexc10.corp.fassil.com.bo',
        port:26,
        auth: {
            user:'',
            pass:''
        }
    })
    return transport
}

const sendMail = async(req,res)=>{
    const transporter=createTrans();
    const info=await transporter.sendMail({
        from:req.body.nombre + "@fassil.com.bo",
        to:req.body.receiverUsername + "@fassil.com.bo",
        subject:req.body.messageSubject,
        html:`<h1>${req.body.message}<h1>`
    })
    console.log("Message send : %s", info.messageId)
    return res.json({msg:"mensaje enviado"})
}
module.exports={
    sendMail:sendMail,

}