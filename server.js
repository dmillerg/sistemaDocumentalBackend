'use strict'

/**** */
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const exec = require('child_process');

const app = express();
const port = 9706;

app.use(cors());

// Configuring body parser middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuracion para subir imagenes
app.use(fileUpload());

// Importamos las rutas
var routes = require('./url/url');
const inicio = require('./controllers/apis');


// Cargamos las rutas
app.use('/apis', routes);
app.get('/apis', inicio.getApis);

module.exports = app;

// Server port
var HTTP_PORT = 9706
    // Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});