const conexion = require("./database");
var errores = 0;
var error_msg;
var success = 0;

function createTables(req, res) {
  tableUsuario().then(() => {
    tableCategorias().then(() => {
      tableDesarrollos().then(() => {
        tableNoticias().then(() => {
          tableTokens().then(() => {
            tableChats().then(() => {
              tableQuienes().then(() => {
                tableScraps().then(() => {
                  tablePosts().then(() => {
                    tableProductos().then(() => {
                      tableRespuesta().then(() => {
                        insertAdmin().then(admin => {
                          return res.status(200).send({ 'ERROR': errores, 'SUCCESS': success });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

function aumentar(arg) {
  console.log(arg)
}

/**
 * Crea todo lo relacionado con las categorias
 */
async function tableCategorias() {
  var query = `DROP TABLE IF EXISTS categorias;
  CREATE TABLE categorias  (
    id int NOT NULL AUTO_INCREMENT COMMENT "Llave Primaria",
    nombre varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    PRIMARY KEY (id) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = COMPACT;`;
  conexion.query(query, function (error, results, fields) {
    if (error) return errores++;
    if (results) return success++;
  });
}

/**
 * Crea todo lo relacionado con los usuarios
 */
async function tableUsuario() {
  var query = `DROP TABLE IF EXISTS usuarios;
  CREATE TABLE usuarios  (
    id int NOT NULL AUTO_INCREMENT COMMENT "Llave Primaria",
    usuario varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    password text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    nombre varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    fecha varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    ultsession varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    PRIMARY KEY (id) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = COMPACT`;
  conexion.query(query, function (error, results, fields) {
    if (error) return errores++;
    if (results) return success++;
  });
}

/**
 * Crea todo lo relacionado con los productos
 */
async function tableProductos() {
  var query = `DROP TABLE IF EXISTS productos;
  CREATE TABLE productos  (
    id int NOT NULL AUTO_INCREMENT,
    titulo varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    descripcion text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    imagen varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    fecha varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    categoria int NULL DEFAULT NULL,
    usos text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    especificaciones text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    garantia text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    precio double NOT NULL,
    PRIMARY KEY (id) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = COMPACT;`;
  conexion.query(query, function (error, results, fields) {
    if (error) return errores++;
    if (results) return success++;
  });
}

/**
 * Crea todo lo relacionado con los desarrollos
 */
async function tableDesarrollos() {
  var query = `DROP TABLE IF EXISTS desarrollos;
  CREATE TABLE desarrollos  (
    id int NOT NULL AUTO_INCREMENT,
    titulo varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    descripcion text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    fecha varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    imagen varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    PRIMARY KEY (id) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = COMPACT;`;
  conexion.query(query, function (error, results, fields) {
    if (error) return errores++;
    if (results) return success++;
  });
}

/**
 * Crea todo lo relacionado con las noticiass
 */
async function tableNoticias() {
  var query = `DROP TABLE IF EXISTS noticias;
  CREATE TABLE noticias  (
    id int NOT NULL AUTO_INCREMENT,
    titulo text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    descripcion text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    fecha varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    imagen varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    enlace varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    fuente varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    logo varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    PRIMARY KEY (id) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 26440 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = COMPACT;`;
  conexion.query(query, function (error, results, fields) {
    if (error) return errores++;
    if (results) return success++;
  });
}

/**
 * Crea todo lo relacionado con los tokens
 */
async function tableTokens() {
  var query = `DROP TABLE IF EXISTS tokens;
  CREATE TABLE tokens  (
    id int NOT NULL AUTO_INCREMENT,
    token varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    usuario_id text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    PRIMARY KEY (id) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = COMPACT;`;
  conexion.query(query, function (error, results, fields) {
    if (error) return errores++;
    if (results) return success++;
  });
}

/**
 * Crea todo lo relacionado con los chats
 */
async function tableChats() {
  var query = `DROP TABLE IF EXISTS chat;
  CREATE TABLE chat  (
    id int NOT NULL AUTO_INCREMENT,
    sms varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    nombre text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    fecha text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    archivo text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    PRIMARY KEY (id) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 176 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = COMPACT;`;
  conexion.query(query, function (error, results, fields) {
    if (error) return errores++;
    if (results) return success++;
  });
}

/**
 * Crea todo lo relacionado con los Integrantes
 */
async function tableQuienes() {
  var query = `DROP TABLE IF EXISTS quienes;
  CREATE TABLE quienes  (
    id int NOT NULL AUTO_INCREMENT,
    nombre varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    cargo varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    imagen varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    orden int NULL DEFAULT NULL,
    PRIMARY KEY (id) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;`;
  conexion.query(query, function (error, results, fields) {
    if (error) return errores++;
    if (results) return success++;
  });
}

/**
 * Crea todo lo relacionado con los scraps
 */
async function tableScraps() {
  var query = `DROP TABLE IF EXISTS scrap;
  CREATE TABLE scrap  (
    id int NOT NULL AUTO_INCREMENT,
    contenedor varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    titulo text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
    fecha varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    descripcion text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
    enlace_selector varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    imagen_selector varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    fuente varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    logo varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    enlace_attr varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    imagen_attr varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    url varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    activo tinyint NOT NULL,
    PRIMARY KEY (id) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;`;
  conexion.query(query, function (error, results, fields) {
    if (error) return errores++;
    if (results) return success++;
  });
}


/**
 * Crea todo lo relacionado con los posts
 */
async function tablePosts() {
  var query = `DROP TABLE IF EXISTS posts;
  CREATE TABLE posts  (
    id int NOT NULL AUTO_INCREMENT,
    alias varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    correo varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    comentario text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
    fecha varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    id_producto int NULL DEFAULT NULL,
    PRIMARY KEY (id) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;`;
  conexion.query(query, function (error, results, fields) {
    if (error) return errores++;
    if (results) return success++;
  });
}

/**
 * Crea todo lo relacionado con las respuestas
 */
async function tableRespuesta() {
  var query = `DROP TABLE IF EXISTS respuesta;
  CREATE TABLE respuesta  (
    id int NOT NULL AUTO_INCREMENT,
    respuesta text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
    id_post int NULL DEFAULT NULL,
    fecha varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    PRIMARY KEY (id) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;`;
  conexion.query(query, function (error, results, fields) {
    if (error) return errores++;
    if (results) return success++;
  });
}

/**
 * Inerta al usuario admin de la pagina
 */
async function insertAdmin() {
  var query = `INSERT INTO usuarios VALUES (0, "kuroko", "$2b$10$dzs/n3VRV0GvJynX8SLZIe1TKoLOmgJObz15pe5IUUNfP6oxfdpjG", "Daniel Miller Gonz??lez", "2021/11/23 19:2:6", "Fri Dec 17 2021 09:49:11 GMT-0500 (hora est??ndar de Cuba)");
  INSERT INTO tokens VALUES (1, '9e-7l-0a-6i-9n-6e-0y-8p-23g',0)`;
  conexion.query(query, function (error, results, fields) {
    if (error) return errores++;
    if (results) return success++;
  });
}

function isAuthenticated(token) {
  conexion.query(
    `SELECT * FROM tokens WHERE token='${token}'`,
    function (err, result) {
      if (err) {
        console.log(err);
        return false;
      }
      if (result) {
        console.log(result);
        return true;
      }
    }
  );
  return false;
}

function all(req, res) {
  let body = req.body;
  let token = body.token;
  console.log(token)
  conexion.query(
    `SELECT * FROM tokens WHERE token='${token}'`,
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(405).send({ message: "usuario no autenticado" });
      }
      if (result.length > 0) {
        console.log(body.query);
        conexion.query(body.query, function (err2, result2) {
          if (err2) {
            res.status(500).send({ message: err2 });
          }
          if (result2.length > 0) {
            res.status(200).send(result2);
          }
        });
      }
    }
  );
}

function loadSQL(req, res) {
  var fs = require('fs');
  var readline = require('readline');
  var rl = readline.createInterface({
    input: fs.createReadStream('./icem2021.12.21.sql'),
    terminal: false
  });
  // console.log('HOLAS' ,rl);
  rl.on('line', function (chunk) {
    // console.log(chunk.toString('ascii'));
    chunk = chunk.replace(/`/g, "");
    chunk = chunk.replace(/'/g, `"`);
    // chunk = chunk.slice(chunk.indexOf('*/'), -2);
    console.log(chunk);
    conexion.query(`${chunk}`, function (err, sets, fields) {

      if (err) return res.status(500).send({ message: 'ERROR: ', err })
    });
  });
  rl.on('close', function () {
    console.log("finished");
    conexion.end();
  });
}

function getDocumentFoto(req, res) {
  try {
    var id = req.params.id;
    var dir = req.query.dir;
    var datatable = req.query.datatable;
    conexion.all(
      `SELECT * FROM ${datatable} WHERE id = ${id}`,
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          var path = require("path");
          res.status(200).sendFile(path.resolve(dir + results[0].imagen + '.pdf'));
        } else {
          console.log(error, results);
          return res
            .status(404)
            .send({ documento: "no existe ningun documento con ese id" });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function deleteFoto(imagen, dir) {
  console.log('Eliminado foto');
  const pathViejo = `./public/documents/${dir}/${imagen}.jpg`;
  console.log(pathViejo);
  // console.log(pathViejo);
  const fs = require("fs");
  if (fs.existsSync(pathViejo)) {
    console.log("borrado");
    fs.unlinkSync(pathViejo);
  }
  return "borrado correctamente";
}

function Scan(req, res) {
  const exec = require('child_process');
  exec.exec('wfs');
  return res.status(200).send({ 'message': 'OK' });
}

function openPDF(req, res) {
  console.log('sasas', req.query);
  const exec = require('child_process');
  const path = require('path');
  try {
    var id = req.params.id;
    var dir = req.query.dir;
    var datatable = req.query.datatable;
    conexion.all(
      `SELECT * FROM ${datatable} WHERE id = ${id}`,
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          exec.exec(path.resolve(dir + results[0].imagen + '.pdf'));
          return res.status(200).send({ message: 'OK' });
        } else {
          console.log(error, results);
          return res
            .status(404)
            .send({ documento: "no existe ningun documento con ese id" });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function getLastNumberDocument(req, res) {
  let tipo = req.query.tipo;
  let date = new Date();
  let year = date.getFullYear();
  let query = `SELECT no FROM ${tipo} WHERE fecha>='${year}-01-01' AND fecha<='${year}-12-31' ORDER BY no DESC LIMIT 1`;
  console.log(query);
  conexion.all(query, function (err, resul, field) {
    console.log(resul, 'asdasd');
    if (resul == undefined) {
      return res.status(200).send('-1');
    } else if (resul.length > 0) {
      return res.status(200).send(resul[0].no);
    } else if (resul.length == 0) {
      return res.status(200).send('-1');
    }
    if (err) {
      return res.status(500).send({ message: 'ERROR', error: err });
    }
  })
}

function createReporte(req, res) {
  var excelJS = require('exceljs');
  var path = require('path');
  let reportes =req.body.reportes;
  let name = 'reportes'
  console.log(reportes);
  const workbook = new excelJS.Workbook();  // Create a new workbook 
  const worksheet = workbook.addWorksheet("Reportes Documentos"); // New Worksheet 
  const paths = "./public";  // Path to download excel  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "NO", key: "no", width: 10 },
    { header: "FECHA", key: "fecha", width: 10 },
    { header: "TIPO", key: "tipoe", width: 10 },
    { header: "CLASIFICACI??N", key: "clasificacion", width: 10 },
    { header: "ORIGEN", key: "origen", width: 10 },
    { header: "T??TULO O ASUNTO", key: "tema", width: 10 },
  ];// Looping through User data
  worksheet.getRow(1).eachCell((cell) => { cell.font = { bold: true }; });

  reportes.forEach((reporte) => {
    reporte.origen = reporte.procedencia==undefined?reporte.enviado:reporte.procedencia
    reporte.tema = reporte.titulo==undefined?reporte.asunto:reporte.titulo;
    reporte.clasificacion = reporte.tipo_doc.name;
    reporte.tipoe = reporte.tipo==0?'emitido':'recibido';
    worksheet.addRow(reporte); // Add data in worksheet  counter++;});// Making first line in excel bold
    const data = workbook.xlsx.writeFile(`${paths}/${name + '.xlsx'}`).then(() => {
      // return res.sendFile(path.resolve(`${paths}/ventas.xlsx`))
      res.download(path.resolve(`${paths}/${name + '.xlsx'}`), name + '');

      return res;
    })
  });
}

module.exports = {
  createTables,
  isAuthenticated,
  all,
  loadSQL,
  getDocumentFoto,
  deleteFoto,
  Scan,
  openPDF,
  getLastNumberDocument,
  createReporte,
};
