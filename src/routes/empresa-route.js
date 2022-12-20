const express = require('express');
const empresaController = require('../controller/empresa-controller')
const ldapController =require('../controller/ldap-controller');




const router=express.Router({mergeParams:true});
    router.get('/empresa/getEmpresas',ldapController.protect,empresaController.getEmpresa)
    router.post('/empresa/registrar',ldapController.protect,empresaController.createNewEmpresa)
    router.post('/empresa/:id_empresa/modificar',ldapController.protect,empresaController.modificarEmpresa)
    router.post('/empresa/:id_empresa/darAltaEmpresa',ldapController.protect,empresaController.darDeAltaEmpresa)   
   // router.delete('/users',mssqlController)
   //router.put('/users',mssqlController)
    

module.exports= router