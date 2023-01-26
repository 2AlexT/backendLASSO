const express = require("express");
const seccionController = require("../controller/seccion-controller");
const ldapController = require("../controller/ldap-controller");

const router = express.Router({ mergeParams: true });

router.get(
  "/gestion/:id_gestion/getSecciones",
  ldapController.protect,
  seccionController.getSecciones
);
router.get(
  "/gestion/:id_gestion/seccion/:id_seccion/getSeccion",
  ldapController.protect,
  seccionController.getSeccion
);
router.post(
  "/gestion/:id_gestion/seccion/crearSeccion",
  ldapController.protect,
  seccionController.createNewSeccion
);
router.post(
  "/gestion/:id_gestion/seccion/:id_seccion/modificarSeccion",
  ldapController.protect,
  seccionController.modificarSeccion
);
router.delete(
  "/gestion/:id_gestion/seccion/:id_seccion/darDeAltaSeccion",
  ldapController.protect,
  seccionController.darAltaSeccion
);

//router.delete('/users')
//router.patch('/users')
module.exports = router;
