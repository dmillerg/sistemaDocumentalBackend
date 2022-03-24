const conexion = require("../database/database");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const { query } = require("express");
const { deleteFoto } = require("../database/manageDB");

function saveOrdinarioPersonal(req, res) {
  console.log(req.body, 'documento ordinario_personal');
  var id = -1;
  var body = req.body;
  var no = body.no;
  var fecha = body.fecha;
  var procedencia = body.procedencia;
  var asunto = body.asunto;
  var destino = body.destino;
  var archivo = body.archivo;
  let date = new Date();
  let imagen_name = no.toString() + '-' + date.getFullYear();
  var foto_name = '';
  if (req.files) {
    foto = req.files.foto;
  }

  conexion.all(
    `SELECT * FROM tokens WHERE token='${req.body.token}'`,
    function (err, result) {
      if (err) {
        return res.status(405).send({ message: "usuario no autenticado" });
      }
      if (result.length > 0) {
        let query = `INSERT INTO documento_ordinario_personal(id, no, fecha, procedencia, asunto, destino, archivo, imagen)
        VALUES (NULL,"${no}","${fecha}","${procedencia}","${asunto}","${destino}","${archivo}","${imagen_name}")`;
        console.log(query)
        conexion.all(
          query,
          function (error, results, fields) {
            if (error) return res.status(500).send({ message: error });
            if (results) {
              saveFoto(foto, imagen_name);
              return res
                .status(201)
                .send({ message: "agregado correctamente" });
            } else {
              return res
                .status(400)
                .send({ message: "Datos mal insertados" });
            }
          });
      }
    });
}

function getOrdinarioPersonals(req, res) {
  var limit = req.params.limit;
  var query = `SELECT * FROM documento_ordinario_personal WHERE 1 `;
  if (limit > 0) {
    query += ` LIMIT ${limit}`;
  }
  conexion.all(query, function (error, results, fields) {
    if (error) return res.status(500).send({ message: "Error en el servidor" });
    if (results) {
      return res.status(200).json(results);
    }
  });
}

function getOrdinarioPersonal(req, res) {
  // Recogemos un parametro por la url
  var id = req.params.id;
  conexion.all(
    `SELECT * FROM documento_ordinario_personal WHERE id = ${id}`,
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        return res.status(302).json(results);
      } else {
        return res
          .status(200)
          .send({ canal: "no existe ningun documento ordinario personal con ese id" });
      }
    }
  );
}

function updateOrdinarioPersonal(req, res) {
  console.log(req.body);
  conexion.all(
    `SELECT * FROM tokens WHERE token='${req.body.token}'`,
    function (err, result) {
      if (err) {
        return res.status(405).send({ message: "usuario no autenticado" });
      }
      if (result.length > 0) {
        // Recogemos un parámetro por la url
        var id = req.params.id;

        // Recogemos los datos que nos llegen en el body de la petición
        var body = req.body;
        var no = body.no;
        var fecha = body.fecha;
        var procedencia = body.procedencia;
        var asunto = body.asunto;
        var destino = body.destino;
        var archivo = body.archivo;
        var imagen = body.imagen;
        let date = new Date();
        let imagen_name = no.toString() + '-' + date.getFullYear();
        var foto = { name: null };
        if (req.files) {
          foto = req.files.foto;
        }

        // Buscamos por id y actualizamos el objeto y devolvemos el objeto actualizado
        conexion.all(
          `SELECT * FROM documento_ordinario_personal WHERE id=${id}`,
          function (err, succ) {
            if (err) {
              return res.status(500).send({ message: "error en el servidor" });
            }
            if (succ) {
              conexion.all(
                `UPDATE documento_ordinario_personal SET no="${no}",fecha="${fecha}",procedencia="${procedencia}", asunto="${asunto}", destino="${destino}",
                 archivo="${archivo}", imagen="${imagen_name}" WHERE id = ${id}`,
                function (error, results, fields) {
                  if (error)
                    return res
                      .status(500)
                      .send({ message: "error en el servidor" });
                  if (results) {
                    deleteFoto(foto, 'documentos_ordinarios_personales');
                    saveFoto(foto, imagen_name);
                    return res
                      .status(201)
                      .send({ message: "agregado correctamente" });
                  } else {
                    return res.status(404).send({
                      message: "no existe ningun documento ordinario personal con ese id",
                    });
                  }
                });

            } else {
              return res
                .status(500)
                .send({ message: "no hay ningun documento ordinario personal con ese id" });
            }
          });
      }
    });
}

function deleteOrdinarioPersonal(req, res) {
  console.log(req.query)
  conexion.all(
    `SELECT * FROM tokens WHERE token='${req.query.token}'`,
    function (err, result) {
      if (err) {
        return res.status(405).send({ message: "usuario no autenticado" });
      }
      if (result.length > 0) {
        var id = req.params.id;
        // Buscamos por id y actualizamos el objeto y devolvemos el objeto actualizado
        conexion.all(
          `SELECT * FROM documento_ordinario_personal WHERE id = ${id}`,
          function (error, result, fields) {
            if (result) {
              deleteFoto(result[0].imagen, 'documentos_ordinarios_personales');
              conexion.all(
                `DELETE FROM documento_ordinario_personal WHERE id = ${id}`,
                function (error, results, fields) {
                  if (error)
                    return res
                      .status(500)
                      .send({ message: "error en el servidor" });
                  if (results) {
                    // conexion.all(`DELETE FROM tokens WHERE usuario_id=${id}`);
                    return res.status(200).json(results);
                  } else {
                    return res
                      .status(404)
                      .send({ message: "no existe ningun documento ordinario personal con ese id" });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
}

function saveFoto(foto, titulo) {
  if (foto.name != null) {
    foto.mv(`./public/documents/documentos_ordinarios_personales/${titulo.toString()}.pdf`, function (err) { });
  }
}

module.exports = {
  saveOrdinarioPersonal,
  getOrdinarioPersonal,
  getOrdinarioPersonals,
  updateOrdinarioPersonal,
  deleteOrdinarioPersonal,
};
