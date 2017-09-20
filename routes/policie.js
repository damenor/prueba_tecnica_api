var express = require('express');
var policieController = require('../controllers/policie');

// Middlewares
var mdAuth = require('../midlewares/authenticated'); 
var mdAdmin = require('../midlewares/isAdmin'); 

// Router express
var api = express.Router();

// Routes
api.get('/policie', [mdAuth.ensureAuth, mdAdmin.isAdmin], policieController.getPolicies);
api.get('/policie/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], policieController.getPolicie);
api.get('/policiesByClient/:clientId', [mdAuth.ensureAuth, mdAdmin.isAdmin], policieController.getPoliciesByClient);
api.get('/clientByPolicie/:policieId', [mdAuth.ensureAuth, mdAdmin.isAdmin], policieController.getClientByPolicie);
api.get('/policieById', [mdAuth.ensureAuth, mdAdmin.isAdmin], policieController.getPolicieById);
api.get('/policieByIdDes', [mdAuth.ensureAuth, mdAdmin.isAdmin], policieController.getPolicieByIdDes);
module.exports = api;