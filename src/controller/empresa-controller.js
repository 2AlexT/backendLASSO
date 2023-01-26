const getConnection = require("../database/mssql-db");
const sql = require("mssql/msnodesqlv8");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/App-error");
const path = require("path");
const dotenv = require("dotenv");
const { promisify } = require("util");

const getEmpresa = async (req, res) => {
  try {
    const empresa = req.params.empresa;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("nombre", sql.VarChar, empresa)
      .query(`Select * from asfi_empresa where indicador='A'`);
    if (!result.recordset[0]) {
      res.json({ Message: "No existe empresa" });
    } else {
      res.json(result.recordset);
    }
    pool.close();
  } catch (err) {
    logger.error(err);
  }
};

const getSingleEmpresa = async (req, res) => {
  try {
    const id_empresa = Number(req.params.id_empresa);
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id_empresa", sql.Int, id_empresa)
      .query(
        `Select * from asfi_empresa where indicador='A' and identificador=@id_empresa`
      );
    if (!result.recordset[0]) {
      res.json({ Message: "No existe empresa" });
    } else {
      res.json(result.recordset);
    }
    pool.close();
  } catch (err) {
    logger.error(err);
  }
};

const createNewEmpresa = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (nombre === undefined || nombre.match(/[ .*$]/) !== null) {
      return res.status(400).json({ msg: "No entra nombr______???" });
    }
    const pool = await getConnection();
    let token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_ACCESS_TOKEN
    );
    console.log(decoded.id.identificador);
    const result = await pool
      .request()
      .input("nombreEmpresa", sql.VarChar, nombre)
      .query(
        `select identificador from asfi_empresa where nombre=@nombreEmpresa and indicador='A'`
      );
    if (!result.recordset[0]) {
      console.log(decoded.id.identificado);
      await pool
        .request()
        .input("I_proceso", sql.Int, 0)
        .input("I_identificador", sql.Int, 0)
        .input("I_nombre", sql.VarChar, nombre)
        .input("I_usuario", sql.Int, decoded.id.identificador)
        .input("I_origen", sql.Int, 0)
        .output("O_msg_error", sql.VarChar)
        .execute("segabm_empresa");
      res.json({ message: "Se creo nueva empresa" });
    } else {
      res.json({ message: "Ya existe la empresa" });
    }
    pool.close();
  } catch (err) {
    logger.error(err);
  }
};

const modificarEmpresa = async (req, res) => {
  try {
    const id_empresa = Number(req.params.id_empresa);
    const { nombre } = req.body;
    if (nombre.match(/[^ .*$]/) !== null) {
      //Verificar cuando tenga espacios igual preguntar**
      return res
        .status(400)
        .json({ msg: "Bad request. Pleas fill all fields" });
    }
    const pool = await getConnection();
    token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_ACCESS_TOKEN
    );
    console.log(decoded.id.identificador);
    const result = await pool
      .request()
      .input("id_empresa", sql.VarChar, id_empresa)
      .query(
        `select * from asfi_empresa where identificador=@id_empresa and indicador='A'`
      );
    if (!result.recordset[0]) {
      res.json({ mess: "No se encuentra la empresa" });
    } else {
      await pool
        .request()
        .input("I_proceso", sql.Int, 1)
        .input("I_identificador", sql.Int, id_empresa)
        .input("I_nombre", sql.VarChar, nombre)
        .input("I_usuario", sql.Int, decoded.id.identificador)
        .input("I_origen", sql.Int, 0)
        .output("O_msg_error", sql.VarChar)
        .execute("segabm_empresa");

      res.json({
        result: {
          message: `Empresa ${result.recordset[0]["nombre"]} paso a ser : ${nombre}`,
        },
      });
    }
    pool.close();
  } catch (err) {
    logger.error(err);
  }
};

const darDeAltaEmpresa = async (req, res) => {
  try {
    const id_empresa = Number(req.params.id_empresa);
    const pool = await getConnection();
    token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_ACCESS_TOKEN
    );
    const result = await pool
      .request()
      .input("id_empresa", sql.VarChar, id_empresa)
      .query(
        `select * from asfi_empresa where identificador=@id_empresa and indicador='A'`
      );
    if (!result.recordset[0]) {
      res.json({ mess: "Empresa ya dada de baja" });
    } else {
      await pool
        .request()
        .input("I_proceso", sql.Int, 2)
        .input("I_identificador", sql.Int, id_empresa)
        .input("I_nombre", sql.VarChar, result.recordset[0]["nombre"])
        .input("I_usuario", sql.Int, decoded.id.identificador)
        .input("I_origen", sql.Int, 0)
        .output("O_msg_error", sql.VarChar)
        .execute("segabm_empresa");

      res.json({
        result: {
          message: `Empresa ${result.recordset[0]["nombre"]} dada de baja`,
        },
      });
    }
    pool.close();
  } catch (err) {
    logger.error(err);
  }
};

module.exports = {
  createNewEmpresa,
  darDeAltaEmpresa,
  modificarEmpresa,
  getEmpresa,
  getSingleEmpresa,
};
