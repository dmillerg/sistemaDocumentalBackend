'use strict'

// Cargamos el módulo de express para poder crear rutas
var express = require('express');

// Cargamos los controladores
var usuario_controller = require('../controllers/usuarios');
var secreto_controller = require('../controllers/secreto');
var limitado_controller = require('../controllers/limitado');
var clasificado_controller = require('../controllers/clasificado');
var ordinario_controller = require('../controllers/ordinario');
var ordinario_personal_controller = require('../controllers/ordinario_personal');
var login_controller = require('../controllers/login');
var document_controller = require('../controllers/documents');
var manage_controller = require('../database/manageDB')

// var superuser_controller = require('../database/superuser');

// Llamamos al router
var api = express.Router();

// Rutas para las api de usuario
api.post('/usuarios', usuario_controller.saveUsuario);
api.get('/usuarios/:limit', usuario_controller.getUsuarios);
api.get('/usuario/:id', usuario_controller.getUsuario);
api.put('/usuarios/:id', usuario_controller.updateUsuario);
api.delete('/usuarios/:id', usuario_controller.deleteUsuario);

// Rutas para las api de secreto
api.post('/secreto', secreto_controller.saveSecreto);
api.get('/secreto', secreto_controller.getSecretos);
api.get('/secreto/:id', secreto_controller.getSecreto);
api.put('/secreto/:id', secreto_controller.updateSecreto);
api.delete('/secreto/:id', secreto_controller.deleteSecreto);

// Rutas para las api de clasificado
api.post('/clasificado', clasificado_controller.saveClasificado);
api.get('/clasificado', clasificado_controller.getClasificados);
api.get('/clasificado/:id', clasificado_controller.getClasificado);
api.put('/clasificado/:id', clasificado_controller.updateClasificaod);
api.delete('/clasificado/:id', clasificado_controller.deleteClasificado);

// Rutas para las api de limitado
api.post('/limitado', limitado_controller.saveLimitado);
api.get('/limitado', limitado_controller.getLimitados);
api.get('/limitado/:id', limitado_controller.getLimitado);
api.put('/limitado/:id', limitado_controller.updateLimitado);
api.delete('/limitado/:id', limitado_controller.deleteLimitado);

// Rutas para las api de ordinario
api.post('/ordinario', ordinario_controller.saveOrdinario);
api.get('/ordinario', ordinario_controller.getOrdinarios);
api.get('/ordinario/:id', ordinario_controller.getOrdinario);
api.put('/ordinario/:id', ordinario_controller.updateOrdinario);
api.delete('/ordinario/:id', ordinario_controller.deleteOrdinario);

// Rutas para las api de ordinario personal
api.post('/ordinariopersonal', ordinario_personal_controller.saveOrdinarioPersonal);
api.get('/ordinariopersonal', ordinario_personal_controller.getOrdinarioPersonals);
api.get('/ordinariopersonal/:id', ordinario_personal_controller.getOrdinarioPersonal);
api.put('/ordinariopersonal/:id', ordinario_personal_controller.updateOrdinarioPersonal);
api.delete('/ordinariopersonal/:id', ordinario_personal_controller.deleteOrdinarioPersonal);
api.get('/documentsFoto/:id', manage_controller.getDocumentFoto);
api.get('/scan', manage_controller.Scan);
api.get('/openpdf/:id', manage_controller.openPDF);
api.get('/lastnumber', manage_controller.getLastNumberDocument);
api.post('/reporte', manage_controller.createReporte);

// Rutas para login and logout
api.post('/login', login_controller.login);
api.post('/logout', login_controller.logout);

// Rutas para los documentos
api.get('/documents',document_controller.getDocument);

// Exportamos la configuración
module.exports = api;