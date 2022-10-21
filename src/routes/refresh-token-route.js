const express = require('express');
const userController = require('../controller/user-controller')
const ldapController =require('../controller/ldap-controller');




const router=express.Router({mergeParams:true});
    router.post('/tokenRefresh',userController.verificarRefreshToken)
module.exports= router