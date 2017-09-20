var express = require('express');
var clientController = require('../controllers/client');

// Middlewares
var mdAuth = require('../midlewares/authenticated'); 

// Router express
var api = express.Router();

// Routes
api.post('/login', clientController.login);
api.get('/client/:id', mdAuth.ensureAuth, clientController.getClientById);
api.get('/clientByName/:name', mdAuth.ensureAuth, clientController.getClientByName);
api.get('/clients', mdAuth.ensureAuth, clientController.getClients);
api.get('/clientsById', mdAuth.ensureAuth, clientController.getClientsById);
api.get('/clientsByIdDes', mdAuth.ensureAuth, clientController.getClientsByIdDes);
api.get('/clientsByName', mdAuth.ensureAuth, clientController.getClientsByName);
api.get('/clientsByNameDes', mdAuth.ensureAuth, clientController.getClientsByNameDes);

module.exports = api;