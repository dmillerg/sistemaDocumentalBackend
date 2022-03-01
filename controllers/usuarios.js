const conexion = require("../database/database");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");

function saveUsuario(req, res) {
  // conexion.all(
  //   `SELECT * FROM tokens WHERE token='${req.body.token}'`,
  //   function (err, result) {
  //     if (err) {
  //       return res.status(405).send({ message: "usuario no autenticado" });
  //     }
  //     if (result.length > 0) {
  // Recogemos los parametros del body
  var id = -1;
  var body = req.body;
  var usuario = body.usuario;
  var password = body.password;
  var nombre = body.nombre;
  var rol = body.rol;
  let date = new Date();

  bcrypt.hash(password, 10, (err, encrypted) => {
    if (err) {
      console.log(err);
    } else {
      conexion.all(
        `INSERT INTO usuarios(id, usuario, password, nombre, fecha_registro, fecha_ultima_sesion, rol) VALUES (NULL,"${usuario}","${encrypted}","${nombre}","${date}","${date}","${rol}")`,
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
        }
      );
    }
  });
  //     }
  //   }
  // );
}

function getUsuarios(req, res) {
  var limit = req.params.limit;
  var query = `SELECT * FROM usuarios WHERE 1 `;
  if (limit > 0) {
    query += ` LIMIT ${limit}`;
  }
  conexion.all(query, function (error, results, fields) {
    if (error) return res.status(500).send({ message: "Error en el servidor" });
    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(200).send({ message: "No hay usuarios" });
    }
  });
}

function getUsuario(req, res) {
  // Recogemos un parametro por la url
  var id = req.params.id;
  conexion.all(
    `SELECT * FROM usuarios WHERE id = ${id}`,
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        return res.status(302).json(results);
      } else {
        return res
          .status(200)
          .send({ canal: "no existe ningun usuario con ese id" });
      }
    }
  );
}

function updateUsuario(req, res) {
  console.log(req.body)
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
        var update = req.body;
        var usuario = update.usuario;
        var pass_old = update.pass_old;
        var password = update.password;
        var nombre = update.nombre;
        var rol = update.rol;

        // Buscamos por id y actualizamos el objeto y devolvemos el objeto actualizado
        conexion.all(
          `SELECT password FROM usuarios WHERE id=${id}`,
          function (err, succ) {
            if (err) {
              res.status(500).send({ message: "error en el servidor" });
            }
            if (succ) {
              if (bcrypt.compareSync(pass_old, succ[0])) {
                bcrypt.hash(password, 10, (err, encrypted) => {
                  if (err) {
                  } else {
                    conexion.all(
                      `UPDATE usuarios SET usuario="${usuario}",password="${encrypted}",nombre="${nombre}", rol="${rol}" WHERE id = ${id}`,
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
                            message: "no existe ningun usuario con ese id",
                          });
                        }
                      }
                    );
                  }
                });
              } else {
                res
                  .status(500)
                  .send({ message: "no hay ningun usuario con ese id" });
              }
            }
          }
        );
      }
    }
  );
}

function deleteUsuario(req, res) {
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
          `SELECT * FROM usuarios WHERE id = ${id}`,
          function (error, result, fields) {
            if (result) {
              conexion.all(
                `DELETE FROM usuarios WHERE id = ${id}`,
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
                      .send({ message: "no existe ningun usuario con ese id" });
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
  saveUsuario,
  getUsuarios,
  getUsuario,
  updateUsuario,
  deleteUsuario,
};
