const conexion = require("../database/database");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
var path = require("path");
const { deleteFoto } = require("../database/manageDB");
const { getClasificados } = require("./clasificado");


function getDocument(req, res) {
  var tipo = req.query.tipo;
  var inicio = req.query.inicio;
  var fin = req.query.fin;
  var proceder = req.query.proceder;
  var nametipo = req.query.nameTipo;

  console.log(req.query, 'asdas');
  var query1 = ``;
  if (inicio != '') {
    query1 += `AND fecha>='${inicio}' `;
  }
  if (fin != '') {
    query1 += `AND fecha<='${fin}' `;
  }
  if (proceder != '') {
    if (tipo == 'documento_clasificado' || tipo == 'documento_ordinario') {
      query1 += `AND enviado= '${proceder}' `
    } else query1 += `AND procedencia LIKE '%${proceder}%' `
  }
  if(nametipo.length>0 && nametipo != '()'){
    query1+=`AND tipo in ${nametipo} `
  }
  var query = `SELECT * FROM ${tipo} WHERE 1 ${query1}`;
  console.log(query);

  conexion.all(query, function (error, results, fields) {
    if (error) return res.status(500).send({ message: "Error en el servidor", error: error });
    if (results) {
      return res.status(200).json(results);
    }
  });
}

module.exports = {
  getDocument,
};
