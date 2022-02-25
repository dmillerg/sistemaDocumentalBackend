const conexion = require("../database/database");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");

function saveLimitado(req, res) {
  console.log(req.body);
  var id = -1;
  var body = req.body;
  var no = body.no;
  var procedencia = body.procedencia;
  var titulo = body.titulo;
  var fecha = body.fecha;
  var movimiento1 = body.movimiento1;
  var movimiento2 = body.movimiento2;
  var destruccion = body.destruccion;
  var expediente = body.expediente;
  var observacion = body.observacion;
  var imagen = body.imagen;
  let date = new Date();

  conexion.all(
    `SELECT * FROM tokens WHERE token='${req.body.token}'`,
    function (err, result) {
      if (err) {
        return res.status(405).send({ message: "usuario no autenticado" });
      }
      if (result.length > 0) {
        let query = `INSERT INTO documento_limitado(id, no, procedencia, titulo, fecha, movimiento1, movimiento2, destruccion, expediente, observacion, imagen)
        VALUES (NULL,"${no}","${procedencia}","${titulo}","${fecha}","${movimiento1}","${movimiento2}","${destruccion}","${expediente}","${observacion}","${imagen}")`
        conexion.all(
          query,
          function (error, results, fields) {
            if (error) return res.status(500).send({ message: error });
            if (results) {
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

function getLimitados(req, res) {
  var limit = req.params.limit;
  var query = `SELECT * FROM documento_limitado WHERE 1 `;
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

function getLimitado(req, res) {
  // Recogemos un parametro por la url
  var id = req.params.id;
  conexion.all(
    `SELECT * FROM documento_limitado WHERE id = ${id}`,
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        return res.status(302).json(results);
      } else {
        return res
          .status(200)
          .send({ canal: "no existe ningun documento limitado con ese id" });
      }
    }
  );
}

function updateLimitado(req, res) {
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
        var procedencia = body.procedencia;
        var titulo = body.titulo;
        var fecha = body.fecha;
        var movimiento1 = body.movimiento1;
        var movimiento2 = body.movimiento2;
        var destruccion = body.destruccion;
        var expediente = body.expediente;
        var observacion = body.observacion;
        var imagen = body.imagen;
        let date = new Date();

        // Buscamos por id y actualizamos el objeto y devolvemos el objeto actualizado
        conexion.all(
          `SELECT password FROM documento_limitado WHERE id=${id}`,
          function (err, succ) {
            if (err) {
              res.status(500).send({ message: "error en el servidor" });
            }
            if (succ) {
              conexion.all(
                `UPDATE documento_limitado SET no="${no}",procedencia="${procedencia}",titulo="${titulo}", fecha="${fecha}", movimiento1="${movimiento1}",
                 movimiento2="${movimiento2}", destruccion="${destruccion}", expediente="${expediente}", observacion="${observacion}", imagen="${imagen}" WHERE id = ${id}`,
                function (error, results, fields) {
                  if (error)
                    return res
                      .status(500)
                      .send({ message: "error en el servidor" });
                  if (results) {
                    return res
                      .status(201)
                      .send({ message: "actualizado correctamente" });
                  } else {
                    return res.status(404).send({
                      message: "no existe ningun documento limitado con ese id",
                    });
                  }
                });

            } else {
              res
                .status(500)
                .send({ message: "no hay ningun documento limitado con ese id" });
            }
          });
      }
    });
}

function deleteLimitado(req, res) {
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
          `SELECT * FROM documento_limitado WHERE id = ${id}`,
          function (error, result, fields) {
            if (result) {
              conexion.all(
                `DELETE FROM documento_limitado WHERE id = ${id}`,
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
                      .send({ message: "no existe ningun documento limitado con ese id" });
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

module.exports = {
  saveLimitado,
  getLimitados,
  getLimitado,
  deleteLimitado,
  updateLimitado
};
