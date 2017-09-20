'use strict'

// Model
var Client = require('../models/client');
var client = new Client();

// Service
var jwt = require('../servicies/jwt');

/*
* Login
*/
function login(req, res){
	let params = req.body;
	client.getOneByEmail(params.email, (status, response) => {
		if(response === null) return res.status(status).send({ message: 'Client not found' });
		if(params.email === response.email){
			res.status(200).send({
				token: jwt.createToken(response)
			})
		}else{
			res.status(status).send({ message: 'Error, email incorrect' });
		}
	});
}

/*
* Get one client by id
*/
function getClientById(req, res){
	let clientId = req.params.id;
	client.getOneById(clientId, (status, response) => {
		if(response === null) return res.status(status).send({ message: 'Client not found' });
		res.status(status).send(response);
	});
}

/*
* Get one client by name
*/
function getClientByName(req, res){
	let clientName = req.params.name;
	client.getOneByName(clientName, (status, response) => {
		if(response === null) return res.status(status).send({ message: 'Client not found' });
		res.status(status).send(response);
	});
}

/*
* Get all clients order by id
*/
function getClientsById(req, res){
	client.getAllById((status, response) => {
		if(response === null) return res.status(status).send({ message: 'Client not found' });
		res.status(status).send(response);
	});
}

/*
* Get all clients order by id descendent
*/
function getClientsByIdDes(req, res){
	client.getAllByIdDes((status, response) => {
		if(response === null) return res.status(status).send({ message: 'Client not found' });
		res.status(status).send(response);
	});
}

/*
* Get all clients order by name
*/
function getClientsByName(req, res){
	client.getAllByName((status, response) => {
		if(response === null) return res.status(status).send({ message: 'Client not found' });
		res.status(status).send(response);
	});
}

/*
* Get all clients order by name descendent
*/
function getClientsByNameDes(req, res){
	client.getAllByNameDes((status, response) => {
		if(response === null) return res.status(status).send({ message: 'Client not found' });
		res.status(status).send(response);
	});
}

/*
* Get all clients
*/
function getClients(req, res){
	client.getAll((status, clients) => {
		res.status(status).send(clients);
	})
}

module.exports = {
	login,
	getClientById, 
	getClientByName,
	getClients,  
	getClientsById,
	getClientsByIdDes,
	getClientsByName,
	getClientsByNameDes
}