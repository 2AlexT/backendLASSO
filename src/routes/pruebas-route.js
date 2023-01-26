const express = require("express");
const mssqlController = require("../controller/user-controller");
const ldapController = require("../controller/ldap-controller");
const emailer = require("../config/emailer");
const generar = require("../helpers/plantillaCreacion");

const router = express.Router({ mergeParams: true });

router.post("/login", ldapController.login, mssqlController.getUserToken);

router.post("/signUp", ldapController.login, mssqlController.createNewUser);
router.post("/senderEmail", ldapController.protect, emailer.sendMail);
router.get(
  "/generatePlantilla",
  ldapController.protect,
  generar.generatePlantilla
);
// router.delete('/users',mssqlController)

//router.put('/users',mssqlController)

module.exports = router;
