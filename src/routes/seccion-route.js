const express = require('express');
const seccionController = require('../controller/seccion-controller')
const ldapController =require('../controller/ldap-controller');



const router=express.Router({mergeParams:true});
    
    router.get('/gestion/:id_gestion/getSecciones',seccionController.getSecciones)
    router.post('/gestion/:id_gestion/seccion/crearSeccion',ldapController.protect,seccionController.createNewSeccion)
    router.post('/gestion/:id_gestion/seccion/modificarSeccion',ldapController.protect,seccionController.modificarSeccion)
    router.post('/gestion/:id_gestion/seccion/darDeAltaSeccion',ldapController.protect,seccionController.darAltaSeccion)
    
    //router.delete('/users')
    //router.patch('/users')
module.exports= router