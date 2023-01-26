const express = require('express');
const gestionController = require('../controller/gestion-controller')
const ldapController =require('../controller/ldap-controller');



const router=express.Router({mergeParams:true});
    router.get('/empresa/getAllGestiones',ldapController.protect,gestionController.getAllGestiones)
    router.get('/empresa/:id_empresa/conseguir_gestion',ldapController.protect,gestionController.getGestiones) 
    router.get('/empresa/:id_empresa/gestion/:id_gestion/getSingleGestion',ldapController.protect,gestionController.getSingleGestion)
    router.post('/empresa/:id_empresa/gestion/:id_gestion/modificarGestion',ldapController.protect,gestionController.modificarGestion)
    router.post('/empresa/:id_empresa/gestion/crearGestion',ldapController.protect,gestionController.createNewGestion)
    router.delete('/empresa/:id_empresa/gestion/:id_gestion/darAltaGestion',ldapController.protect,gestionController.gestionDarAlta)
    
    //router.delete('/users')
    //router.patch('/users')
module.exports= router