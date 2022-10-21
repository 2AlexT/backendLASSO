const express = require('express');
const documentoController = require('../controller/documento-controller')
const ldapController =require('../controller/ldap-controller');



const router=express.Router({mergeParams:true});
    
    router.get('/articulo/:id_articulo/getDocumento',ldapController.protect,documentoController.getDocumentos)
    router.post('/articulo/:id_articulo/articulo/crearDocumento',ldapController.protect,documentoController.createNewDocumento)
    router.post('/articulo/:id_articulo/articulo/modificarDocumento',ldapController.protect,documentoController.modificarDocumento)
    router.post('/articulo/:id_articulo/articulo/darDeAltaDocumento',ldapController.protect)
    router.post('/articulo/:id_articulo/articulo/upload',documentoController.uploadFile)
    //router.delete('/users')
    //router.patch('/users')
module.exports= router