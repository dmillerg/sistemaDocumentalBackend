const conexion = require("../database/database");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const { deleteFoto } = require("../database/manageDB");

function saveSecreto(req, res) {
  var id = -1;
  var body = req.body;
  var no = body.no;
  var lugar = body.lugar;
  var reg_no = body.reg_no;
  var titulo = body.titulo;
  var categoria = body.categoria;
  var mat_no = body.mat_no;
  var folio_no = body.folio_no;
  var cant = body.cant;
  var no_ejemplar = body.no_ejemplar;
  var cant_hojas = body.cant_hojas;
  var destruccion = body.destruccion;
  var destino = body.destino;
  var tipo = body.tipo;
  var comp = body.comp;
  var fecha = body.fecha;
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
        let query = `INSERT INTO documento_secreto(id, no, lugar, reg_no, titulo, categoria, mat_no, folio_no, cant, no_ejemplar, cant_hojas, destruccion, destino, comp, imagen, tipo, fecha)
        VALUES (NULL,"${no}","${lugar}","${reg_no}","${titulo}","${categoria}","${mat_no}","${folio_no}","${cant}","${no_ejemplar}","${cant_hojas}","${destruccion}","${destino}","${comp}", "${imagen_name}", "${tipo}", "${fecha}")`;
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

function getSecretos(req, res) {
  var limit = req.params.limit;
  var query = `SELECT * FROM documento_secreto WHERE 1 `;
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

function getSecreto(req, res) {
  // Recogemos un parametro por la url
  var id = req.params.id;
  conexion.all(
    `SELECT * FROM documento_secreto WHERE id = ${id}`,
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        return res.status(302).json(results);
      } else {
        return res
          .status(200)
          .send({ canal: "no existe ningun documento secreto con ese id" });
      }
    }
  );
}

function updateSecreto(req, res) {
  conexion.all(
    `SELECT * FROM tokens WHERE token='${req.body.token}'`,
    function (err, result) {
      if (err) {
        return res.status(405).send({ message: "usuario no autenticado" });
      }
      if (result.length > 0) {
        // Recogemos un par??metro por la url
        var id = req.params.id;

        // Recogemos los datos que nos llegen en el body de la petici??n
        var id = -1;
        var body = req.body;
        var no = body.no;
        var lugar = body.lugar;
        var reg_no = body.reg_no;
        var titulo = body.titulo;
        var categoria = body.categoria;
        var mat_no = body.mat_no;
        var folio_no = body.folio_no;
        var cant = body.cant;
        var no_ejemplar = body.no_ejemplar;
        var cant_hojas = body.cant_hojas;
        var destruccion = body.destruccion;
        var tipo = body.tipo;
        var destino = body.destino;
        var comp = body.comp;
        var fecha = body.fecha;
        let date = new Date();
        let imagen_name = no.toString() + '-' + date.getFullYear();
        var foto_name = '';
        if (req.files) {
          foto = req.files.foto;
        }

        // Buscamos por id y actualizamos el objeto y devolvemos el objeto actualizado
        conexion.all(
          `SELECT * FROM documento_secreto WHERE id=${id}`,
          function (err, succ) {
            if (err) {
             return  res.status(500).send({ message: "error en el servidor" });
            }
            if (succ) {
              conexion.all(
                `UPDATE documento_secreto SET no="${no}",lugar="${lugar}",reg_no="${reg_no}", titulo="${titulo}", categoria="${categoria}",
                 mat_no="${mat_no}", folio_no="${folio_no}", cant="${cant}", no_ejemplar="${no_ejemplar}", cant_hojas="${cant_hojas}", destruccion="${destruccion}", destino="${destino}", comp="${comp}", imagen="${imagen_name}", tipo="${tipo}", fecha="${fecha}" WHERE id = ${id}`,
                function (error, results, fields) {
                  if (error)
                    return res
                      .status(500)
                      .send({ message: "error en el servidor", error });
                  if (results) {
                    deleteFoto(foto, 'documentos_secretos');
                    saveFoto(foto, imagen_name);
                    return res
                      .status(201)
                      .send({ message: "agregado correctamente" });
                  } else {
                    return res.status(404).send({
                      message: "no existe ningun documento secreto con ese id",
                    });
                  }
                });

            } else {
             return res
                .status(500)
                .send({ message: "no hay ningun documento secreto con ese id" });
            }
          });
      }
    });
}

function deleteSecreto(req, res) {
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
          `SELECT * FROM documento_secreto WHERE id = ${id}`,
          function (error, result, fields) {
            if (result) {
              deleteFoto(result[0].imagen, 'documentos_secretos');
              conexion.all(
                `DELETE FROM documento_secreto WHERE id = ${id}`,
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
                      .send({ message: "no existe ningun documento secreto con ese id" });
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
    foto.mv(`./public/documents/documentos_secretos/${titulo.toString()}.pdf`, function (err) { });
  }
}

module.exports = {
  saveSecreto,
  getSecreto,
  getSecretos,
  updateSecreto,
  deleteSecreto,
};
