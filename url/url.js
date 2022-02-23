'use strict'

// Cargamos el módulo de express para poder crear rutas
var express = require('express');

// Cargamos los controladores
var usuario_controller = require('../controllers/usuarios');
var secreto_controller = require('../controllers/secreto');
var clasificado_controller = require('../controllers/clasificado');
var login_controller = require('../controllers/login');

// var superuser_controller = require('../database/superuser');

// Llamamos al router
var api = express.Router();

// Rutas para las api de usuario
api.post('/usuarios', usuario_controller.saveUsuario);
api.get('/usuarios/:limit', usuario_controller.getUsuarios);
api.get('/usuario/:id', usuario_controller.getUsuario);
api.put('/usuarios/:id', usuario_controller.updateUsuario);
api.delete('/deleteUsuario/:id', usuario_controller.deleteUsuario);

// Rutas para las api de secreto
api.post('/secreto', secreto_controller.saveSecreto);
api.get('/secreto', secreto_controller.getSecreto);
// api.get('/secreto/:id', secreto_controller.getUsuario);
api.put('/secreto/:id', secreto_controller.updateSecreto);
api.delete('/secreto/:id', secreto_controller.deleteSecreto);

// Rutas para las api de clasificado
api.post('/clasificado', clasificado_controller.saveClasificado);
api.get('/clasificado', clasificado_controller.getClasificado);
// api.get('/secreto/:id', secreto_controller.getUsuario);
api.put('/clasificado/:id', clasificado_controller.updateClasificaod);
api.delete('/clasificado/:id', clasificado_controller.deleteClasificado);

// Rutas para login and logout
api.post('/login', login_controller.login);
api.post('/logout', login_controller.logout);

// Exportamos la configuración
module.exports = api;