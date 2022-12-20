const express = require('express');
const articuloController = require('../controller/articulo-controller')
const ldapController =require('../controller/ldap-controller');
const authController =require('../controller/auth-controller')


const router=express.Router({mergeParams:true});
//authController.permit("comida")
    router.get('/seccion/:id_seccion/getArticulos',ldapController.protect,articuloController.getArticulo)
    router.post('/seccion/:id_seccion/articulo/crearArticulo',ldapController.protect,articuloController.createNewArticulo)
    router.post('/seccion/:id_seccion/articulo/:id_articulo/modificarArticulo',ldapController.protect,articuloController.modificarArticulo)
    router.post('/seccion/:id_seccion/articulo/:id_articulo/darDeAltaArticulo',ldapController.protect,articuloController.articuloDarDeAlta)
    
    //router.delete('/users')
    //router.patch('/users')
module.exports= router