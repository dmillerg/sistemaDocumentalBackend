const conexion = require("../database/database");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const { deleteFoto } = require("../database/manageDB");

function saveOrdinario(req, res) {
  var id = -1;
  var body = req.body;
  console.log(body)
  var no = body.no;
  var fecha = body.fecha;
  var enviado = body.enviado;
  var rsb = body.rsb;
  var rs = body.rs;
  var fecha_registro_ctc = body.fecha_registro_ctc;
  var asunto = body.asunto;
  var destino = body.destino;
  var traslado = body.traslado;
  var fecha_traslado = body.fecha_traslado;
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
        conexion.all(
          `INSERT INTO documento_ordinario(id, no, fecha, enviado, rsb, rs, fecha_registro_ctc, asunto, destino, traslado, fecha_traslado, imagen)
         VALUES (NULL,"${no}","${fecha}","${enviado}","${rsb}","${rs}","${fecha_registro_ctc}","${asunto}", "${destino}","${traslado}","${fecha_traslado}", "${imagen_name}")`,
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

function getOrdinarios(req, res) {
  var limit = req.params.limit;
  var query = `SELECT * FROM documento_ordinario WHERE 1 `;
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

function getOrdinario(req, res) {
  // Recogemos un parametro por la url
  var id = req.params.id;
  conexion.all(
    `SELECT * FROM documento_ordinario WHERE id = ${id}`,
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        return res.status(302).json(results);
      } else {
        return res
          .status(200)
          .send({ canal: "no existe ningun documento ordinario con ese id" });
      }
    }
  );
}

function updateOrdinario(req, res) {
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
        var destino = body.destino;
        var traslado = body.traslado;
        var fecha_traslado = body.fecha_traslado;
        let date = new Date();
        let imagen_name = no.toString() + '-' + date.getFullYear();
        var foto = { name: null };
        if (req.files) {
          foto = req.files.foto;
        }

        // Buscamos por id y actualizamos el objeto y devolvemos el objeto actualizado
        conexion.all(
          `SELECT * FROM documento_ordinario WHERE id=${id}`,
          function (err, succ) {
            if (err) {
              return res.status(500).send({ message: "error en el servidor" +err});
            }
            if (succ) {
              conexion.all(
                `UPDATE documento_ordinario SET no="${no}",fecha="${fecha}",enviado="${enviado}", rsb="${rsb}", rs="${rs}",
                 fecha_registro_ctc="${fecha_registro_ctc}", asunto="${asunto}", destino="${destino}", traslado="${traslado}", fecha_traslado="${fecha_traslado}", imagen=${imagen_name} WHERE id = ${id}`,
                function (error, results, fields) {
                  if (error)
                  return res
                    .status(500)
                    .send({ message: "error en el servidor "+ error });
                if (results) {
                  deleteFoto(foto, 'documentos_ordinarios');
                  saveFoto(foto, imagen_name);
                  return res
                    .status(201)
                    .send({ message: "agregado correctamente" });
                } else {
                  return res.status(404).send({
                    message: "no existe ningun documento ordinario con ese id",
                  });
                }
                });

            } else {
              return res
                .status(500)
                .send({ message: "no hay ningun documento clasificado con ese id" });
            }
          });
      }
    });
}

function deleteOrdinario(req, res) {
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
          `SELECT * FROM documento_ordinario WHERE id = ${id}`,
          function (error, result, fields) {
            if (result) {
              deleteFoto(result[0].imagen, 'documentos_ordinarios');
              conexion.all(
                `DELETE FROM documento_ordinario WHERE id = ${id}`,
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
                      .send({ message: "no existe ningun documento ordinario con ese id" });
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
    foto.mv(`./public/documents/documentos_ordinarios/${titulo.toString()}.jpg`, function (err) { });
  }
}

module.exports = {
  saveOrdinario,
  getOrdinario,
  getOrdinarios,
  updateOrdinario,
  deleteOrdinario,
};
