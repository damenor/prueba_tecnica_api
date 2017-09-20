'use strict'

// Model
var Policie = require('../models/policie');
var policie = new Policie();

/*
* Get one client by id
*/
function getPolicie(req, res){
	let policieId = req.params.id;
	policie.getOne(policieId, (status, response) => {
		if(response === null) return res.status(status).send({ message: 'Policie not found' });
		res.status(status).send(response);
	});
}

/*
* Get client by policie
*/
function getClientByPolicie(req, res){
	let policieId = req.params.policieId;
	policie.getClientByPolicie(policieId, (status, response) => {
		if(response === null) return res.status(status).send({ message: 'Policie not found' });
		res.send(response)
	});
}

/*
* Get policies by client
*/
function getPoliciesByClient(req, res){
	let clientId = req.params.clientId;
	policie.getPoliciesByClient(clientId, (status, response) => {
		if(response === null) return res.status(status).send({ message: 'Policie not found' });
		res.status(status).send(response);
	});
}

/*
* Get all policies by id
*/
function getPolicieById(req, res){
	policie.getAllById((status, response) => {
		if(response === null) return res.status(status).send({ message: 'Policie not found' });
		res.status(status).send(response);
	});
}

/*
* Get all policies by id descendent
*/
function getPolicieByIdDes(req, res){
	policie.getAllByIdDes((status, response) => {
		if(response === null) return res.status(status).send({ message: 'Policie not found' });
		res.status(status).send(response);
	});
}

/*
* Get all policies
*/
function getPolicies(req, res){
	policie.getAll((status, Policies) => {
		res.status(status).send(Policies);
	})
}

module.exports = {
	getPolicies, 
	getPolicie,
	getPoliciesByClient, 
	getPolicieById,
	getPolicieByIdDes,
	getClientByPolicie
}