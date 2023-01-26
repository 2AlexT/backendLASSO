const getConnection = require("../database/mssql-db");
const sql = require("mssql/msnodesqlv8");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/App-error");
const path = require("path");
const dotenv = require("dotenv");
const { promisify } = require("util");

//---------------------Articulos---------------------------

const getArticulo = async (req, res) => {
  try {
    const id_seccion = req.params.id_seccion;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id_seccion", sql.VarChar, id_seccion)
      .query(
        `Select * from asfi_articulo where id_seccion=@id_seccion and indicador='A'`
      );
    if (!result.recordset[0]) {
      res.status(404).json([]);
    } else {
      res.json(result.recordset);
    }
    pool.close();
  } catch (err) {
    logger.error(err);
  }
};

const getSingleArticulo = async (req, res) => {
  try {
    const id_seccion = Number(req.params.id_seccion);
    const id_articulo = Number(req.params.id_articulo);
    if (isNaN(id_seccion) || isNaN(id_articulo)) {
      res.status(401).json({ Error: "Incluir un numero de verdad" });
    }
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id_articulo", sql.Int, id_articulo)
      .input("id_seccion", sql.Int, id_seccion)
      .query(
        `Select * from asfi_articulo where identificador=@id_articulo and id_seccion=@id_seccion and indicador='A'`
      );
    if (!result.recordset[0]) {
      res.status(404).json([]);
    } else {
      res.json(result.recordset);
    }
    pool.close();
  } catch (err) {
    logger.error(err);
  }
};

getCantidadMaximaDocumentos = async (req, res) => {
  try {
    const id_seccion = Number(req.params.id_seccion);
    if (isNaN(id_seccion)) {
      res.status(401).json({ Error: "Incluir un numero de verdad" });
    } else {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("id_seccion", id_seccion)
        .query(
          `Select identificador,cantidad_articulo,id_seccion,articulo from asfi_articulo where id_seccion=@id_seccion and indicador='A'`
        );
      res.status(200).json(result.recordset);
    }
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

//Modificar cantidadArticulos
modificarCantidadArticulos = async (req, res) => {
  try {
    const id_articulo = Number(req.params.id_articulo);
    const { cantidad_articulo } = req.body;
    if (isNaN(id_articulo) || isNaN(cantidad_articulo)) {
      res.status(401).json({ Error: "Incluir un numero de verdad" });
    } else {
      const pool = await getConnection();
      await pool
        .request()
        .input("id_articulo", id_articulo)
        .input("cantidad_articulo", cantidad_articulo)
        .query(
          `update asfi_articulo
              set cantidad_articulo = @cantidad_articulo
              where identificador = @id_articulo and indicador='A'`
        );
      res.status(200).json("se cambio los valores de la tabla");
    }
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

const createNewArticulo = async (req, res) => {
  try {
    const id_seccion = Number(req.params.id_seccion);
    if (isNaN(id_seccion)) {
      res.status(401).json({ Error: "Incluir un numero de verdad" });
    }
    const { articulo } = req.body;
    if (typeof articulo !== "number") {
      return res
        .status(400)
        .json({ msg: "Bad request. Pleas fill all fields" });
    }
    let token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_ACCESS_TOKEN
    );
    console.log(decoded.id.identificador);
    const pool = await getConnection();
    const resultSeccionExiste = await pool
      .request()
      .input("id_seccion", sql.Int, id_seccion)
      .query(
        `select identificador from asfi_seccion where identificador=@id_seccion and indicador='A'`
      );
    //Averiguar sobre id empresa y nombre empresa
    if (!resultSeccionExiste.recordset[0]) {
      res.status(401).json({ message: "Seccion inexistente" });
    } else {
      const resultArticuloExiste = await pool
        .request()
        .input("articulo", sql.Int, articulo)
        .input("id_seccion", sql.Int, id_seccion)
        .query(
          `select identificador from asfi_articulo where articulo=@articulo and indicador='A' and id_seccion=@id_seccion`
        );
      console.log(resultArticuloExiste.recordset[0]);
      if (!resultArticuloExiste.recordset[0]) {
        await pool
          .request()
          .input("I_proceso", sql.Int, 0)
          .input("I_identificador", sql.Int, 0)
          .input("I_id_seccion", sql.VarChar, id_seccion)
          .input("I_articulo", sql.Int, articulo)
          .input("I_usuario", sql.Int, decoded.id.identificador)
          .input("I_origen", sql.Int, 0)
          .output("O_msg_error", sql.VarChar)
          .execute("segabm_articulo");
        res.json({ message: "Se creo nueva articulo" });
      } else {
        res
          .status(401)
          .json({ message: "Ya existe articulo dentro de la seccion" });
      }
    }
    pool.close();
  } catch (err) {
    logger.error(err);
  }
};

containsObjectArticulo = (obj, list) => {
  let i;
  let val = false;
  console.log("entro al contains");
  for (i = 0; i < list.length; i++) {
    if (list[i].articulo == obj) {
      val = true;
    }
  }
  return val;
};

const modificarArticulo = async (req, res) => {
  try {
    const id_seccion = Number(req.params.id_seccion);
    const id_articulo = Number(req.params.id_articulo);
    if (isNaN(id_seccion)) {
      res.status(401).json({ Error: "Incluir un numero de verdad" });
    }
    const { articulo } = req.body;
    if (typeof articulo !== "number" || typeof id_articulo !== "number") {
      return res
        .status(400)
        .json({ msg: "articulo o id articulo no es un numero" });
    }
    token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_ACCESS_TOKEN
    );
    console.log(decoded.id.identificador);
    const pool = await getConnection();
    const resultSeccionExiste = await pool
      .request()
      .input("id_seccion", sql.Int, id_seccion)
      .query(
        `select identificador from asfi_seccion where identificador=@id_seccion and indicador='A'`
      );
    //Averiguar sobre id empresa y nombre empresa

    if (!resultSeccionExiste.recordset[0]) {
      res.json({ message: "seccion con id no existe" });
    } else {
      const resultArticuloExiste = await pool
        .request()
        .input("id_articulo", sql.Int, id_articulo)
        .input("id_seccion", sql.Int, id_seccion)
        .query(
          `select * from asfi_articulo where identificador=@id_articulo and indicador='A' and id_seccion=@id_seccion`
        );
      let articuloNombre = resultArticuloExiste.recordset[0]["articulo"];
      if (!resultArticuloExiste.recordset[0]) {
        res.json({ message: "Seccion con articulo no existe" });
      } else {
        console.log(articuloNombre);
        const listaNombresArticulo = await pool
          .request()
          .input("articuloNombre", sql.VarChar, articuloNombre)
          .input("id_seccion", sql.Int, id_seccion)
          .input("id_articulo", sql.Int, id_articulo)
          .query(
            `select articulo from asfi_articulo where indicador='A' and identificador!=@id_articulo and id_seccion=@id_seccion`
          );
        if (containsObjectArticulo(articulo, listaNombresArticulo.recordset)) {
          res
            .status(402)
            .json({ message: "Articulo tiene mismo nombre a otros" });
        } else {
          await pool
            .request()
            .input("I_proceso", sql.Int, 1)
            .input("I_identificador", sql.Int, id_articulo)
            .input("I_id_seccion", sql.VarChar, id_seccion)
            .input("I_articulo", sql.Int, articulo)
            .input("I_usuario", sql.Int, decoded.id.identificador)
            .input("I_origen", sql.Int, 0)
            .output("O_msg_error", sql.VarChar)
            .execute("segabm_articulo");
          res.json({
            message: `Se modifico el articulo '${resultArticuloExiste.recordset[0]["articulo"]}' al siguiente valor ${articulo}`,
          });
        }
      }
    }
    pool.close();
  } catch (err) {
    logger.error(err);
    console.log(err);
  }
};

const articuloDarDeAlta = async (req, res) => {
  try {
    const id_seccion = Number(req.params.id_seccion);
    const id_articulo = Number(req.params.id_articulo);
    if (isNaN(id_seccion)) {
      res.status(401).json({ Error: "Incluir un numero de verdad" });
    }
    if (typeof id_articulo !== "number") {
      return res.status(400).json({ msg: "Id articulo no es un numero" });
    }
    token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_ACCESS_TOKEN
    );
    console.log(decoded.id.identificador);
    const pool = await getConnection();
    const resultSeccionActiva = await pool
      .request()
      .input("id_seccion", sql.Int, id_seccion)
      .query(
        `select identificador from asfi_seccion where identificador=@id_seccion and indicador='A'`
      );
    //Averiguar sobre id empresa y nombre empresa
    if (!resultSeccionActiva.recordset[0]) {
      res.json({ message: "Seccion con id no existe" });
    } else {
      const resultArticuloExiste = await pool
        .request()
        .input("id_articulo", sql.Int, id_articulo)
        .input("id_seccion", sql.Int, id_seccion)
        .query(
          `select identificador from asfi_articulo where identificador=@id_articulo and indicador='A' and id_seccion=@id_seccion`
        );
      if (!resultArticuloExiste.recordset[0]) {
        res.json({
          message: "Seccion con articulo no existe o ya dada de alta",
        });
      } else {
        await pool
          .request()
          .input("I_proceso", sql.Int, 2)
          .input("I_identificador", sql.Int, id_articulo)
          .input("I_id_seccion", sql.VarChar, id_seccion)
          .input("I_articulo", sql.Int, id_articulo)
          .input("I_usuario", sql.Int, decoded.id.identificador)
          .input("I_origen", sql.Int, 0)
          .output("O_msg_error", sql.VarChar)
          .execute("segabm_articulo");
        res.json({
          message: `Se dio de alta el articulo  '${id_articulo}' de la empresa`,
        });
      }
    }
    pool.close();
  } catch (err) {
    logger.error(err);
    console.log(err);
  }
};
module.exports = {
  getArticulo,
  createNewArticulo,
  modificarArticulo,
  articuloDarDeAlta,
  getSingleArticulo,
  getCantidadMaximaDocumentos,
  modificarCantidadArticulos,
};
