const conexion = require("../database/database");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
var path = require("path");

function saveClasificado(req, res) {
  console.log(req.body);
  var id = -1;
  var body = req.body;
  var no = body.no;
  var fecha = body.fecha;
  var enviado = body.enviado;
  var rsb = body.rsb;
  var rs = body.rs;
  var fecha_registro_ctc = body.fecha_registro_ctc;
  var asunto = body.asunto;
  var doc = body.doc;
  var ej = body.ej;
  var clasif = body.clasif;
  var destino = body.destino;
  var traslado = body.traslado;
  var fecha_traslado = body.fecha_traslado;
  let date = new Date();
  var foto = { name: null };
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
        conexion.all(
          `INSERT INTO documento_clasificado(id, no, fecha, enviado, rsb, rs, fecha_registro_ctc, asunto, doc, ej, clasif, destino, traslado, fecha_traslado, imagen)
         VALUES (NULL,"${no}","${fecha}","${enviado}","${rsb}","${rs}","${fecha_registro_ctc}","${asunto}","${doc}","${ej}","${clasif}", "${destino}","${traslado}","${fecha_traslado}", "${no}")`,
          function (error, results, fields) {
            if (error) return res.status(500).send({ message: error });
            if (results) {
              if (req.files) saveFoto(foto, no);
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

function getClasificados(req, res) {
  var limit = req.params.limit;
  var query = `SELECT * FROM documento_clasificado WHERE 1 `;
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

function getClasificado(req, res) {
  // Recogemos un parametro por la url
  var id = req.params.id;
  conexion.all(
    `SELECT * FROM documento_clasificado WHERE id = ${id}`,
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        return res.status(302).json(results);
      } else {
        return res
          .status(200)
          .send({ canal: "no existe ningun documento clasificado con ese id" });
      }
    }
  );
}

function updateClasificaod(req, res) {
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
        var enviado = body.enviado;
        var rsb = body.rsb;
        var rs = body.rs;
        var fecha_registro_ctc = body.fecha_registro_ctc;
        var asunto = body.asunto;
        var doc = body.doc;
        var ej = body.ej;
        var clasif = body.clasif;
        var destino = body.destino;
        var traslado = body.traslado;
        var fecha_traslado = body.fecha_traslado;
        let date = new Date();
        var foto = { name: null };
        if (req.files) {
          foto = req.files.foto;
          foto_name = titulo.replace(/ /g, "-") + ".jpg";
          console.log(foto_name);
        }

        // Buscamos por id y actualizamos el objeto y devolvemos el objeto actualizado
        conexion.all(
          `SELECT password FROM documento_clasificado WHERE id=${id}`,
          function (err, succ) {
            if (err) {
              res.status(500).send({ message: "error en el servidor" });
            }
            if (succ) {
              conexion.all(
                `UPDATE documento_clasificado SET no="${no}",fecha="${fecha}",enviado="${enviado}", rsb="${rsb}", rs="${rs}",
                 fecha_registro_ctc="${fecha_registro_ctc}", asunto="${asunto}", doc="${doc}", ej="${ej}", clasif="${clasif}", destino="${destino}", traslado="${traslado}", fecha_traslado="${fecha_traslado}" WHERE id = ${id}`,
                function (error, results, fields) {
                  if (error)
                    return res
                      .status(500)
                      .send({ message: "error en el servidor" });
                  if (results) {
                    return res
                      .status(201)
                      .send({ message: "agregado correctamente" });
                  } else {
                    return res.status(404).send({
                      message: "no existe ningun documento clasificado con ese id",
                    });
                  }
                });

            } else {
              res
                .status(500)
                .send({ message: "no hay ningun documento clasificado con ese id" });
            }
          });
      }
    });
}

function deleteClasificado(req, res) {
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
          `SELECT * FROM documento_clasificado WHERE id = ${id}`,
          function (error, result, fields) {
            if (result) {
              conexion.all(
                `DELETE FROM documento_clasificado WHERE id = ${id}`,
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
                      .send({ message: "no existe ningun documento clasificado con ese id" });
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
    foto.mv(`./public/documents/documentos_clasificados/${titulo.toString()}.jpg`, function (err) { });
  }
}

module.exports = {
  saveClasificado,
  getClasificado,
  getClasificados,
  updateClasificaod,
  deleteClasificado,
};
