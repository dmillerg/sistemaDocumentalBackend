const conexion = require("../database/database");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
var path = require("path");
const { deleteFoto } = require("../database/manageDB");


function getDocument(req, res) {
  var tipo = req.query.tipo;
  var query = `SELECT * FROM ${tipo}`;
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
