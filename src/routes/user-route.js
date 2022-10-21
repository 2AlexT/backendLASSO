const express = require('express');
const mssqlController = require('../controller/user-controller')
const ldapController =require('../controller/ldap-controller');

const router=express.Router({mergeParams:true});



router.post('/login',ldapController.login,mssqlController.getUserToken)
router.post('/signUp',ldapController.login,mssqlController.createNewUser)
    
    router.get('/users/:id',mssqlController.getUsuario)
    router.post('/users/modificar',ldapController.protect,mssqlController.modificarUser)
    //router.delete('/users')
    //router.patch('/users')
module.exports= router