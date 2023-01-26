const express = require("express");
const documentoController = require("../controller/documento-controller");
const ldapController = require("../controller/ldap-controller");

const router = express.Router({ mergeParams: true });

router.get(
  "/articulo/:id_articulo/getAllDocumentos",
  ldapController.protect,
  documentoController.getDocumentos
);
router.get(
  "/articulo/:id_articulo/documento/:id_documento/getSingleDocumento",
  ldapController.protect,
  documentoController.getSingleDocumento
);

router.post(
  "/articulo/:id_articulo/articulo/crearDocumento",
  ldapController.protect,
  documentoController.createNewDocumento
);
router.post(
  "/articulo/:id_articulo/documento/:id_documento/modificarDocumento",
  ldapController.protect,
  documentoController.modificarDocumento
);

router.delete(
  "/articulo/:id_articulo/documento/:id_documento/darDeAltaDocumento",
  ldapController.protect,
  documentoController.eliminarDocumentos
);
router.post(
  "/articulo/:id_articulo/upload",
  ldapController.protect,
  documentoController.uploadFile
);
router.get(
  "/:id_articulo/listaDocumentosId",
  documentoController.listaDocumentosId
);
router.post("/downloads", documentoController.donwloads);

//router.delete('/users')
//router.patch('/users')
module.exports = router;
