'use strict'

var Client = require('./client');
var client = new Client();

class Policie {

	constructor() {
		this.http = require('http');
		this.url = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';
	}

	/*
	* Get one policie by id
	*@Params policieId: number, callback: function
	*/
	getOne(policieId, callback) {
		this.getAll((status, policies) => {
			policies.filter((e) => {
				if (policieId === e.id) return callback(status, e);
			});
			return callback(status, null);
		})
	}

	/*
	* Get client by policie
	*@Params policieId: number, callback: function
	*/
	getClientByPolicie(policieId, callback){
		this.getAll((status, policies) => {
			policies.filter((e) => {
				if (policieId === e.id){
					client.getOneById(e.clientId, (status, clientPolicie) => {
						return callback(status, clientPolicie);
					})
				}
			});
		})
	}

	/*
	* Get policies by client
	*@Params clientId: number, callback: function
	*/
	getPoliciesByClient(clientId, callback) {
		this.getAll((status, policies) => {
			let policiesClient = [];
			policies.filter((e) => {
				if (clientId === e.clientId) policiesClient.push(e);
			});
			return callback(status, policiesClient);
		})
	}

	/*
	* Get all policies by id
	*@Params callback: function
	*/
	getAllById(callback) {
		this.getAll((status, policies) => {
			let policiesById = policies.sort((a, b) => {
				if (a.id < b.id) return -1;
				if (a.id > b.id) return 1;
				return 0;
			})
			callback(status, policiesById);
		})
	}

	/*
	* Get all policies by id descendent
	*@Params callback: function
	*/
	getAllByIdDes(callback) {
		this.getAll((status, policies) => {
			let policiesById = policies.sort((a, b) => {
				if (a.id < b.id) return 1;
				if (a.id > b.id) return -1;
				return 0;
			})
			callback(status, policiesById);
		})
	}

	/*
	* Get all policies
	*@Params callback: function
	*/
	getAll(callback) {
		this.http.get(this.url, (res) => {
			const { statusCode } = res;
			const contentType = res.headers['content-type'];

			let error;
			if (statusCode !== 200) {
				error = new Error('Request Failed.\n' +
					`Status Code: ${statusCode}`);
			}
			if (error) {
				res.resume();
				return;
			}

			res.setEncoding('utf8');
			let policiesData = '';
			res.on('data', (chunk) => {
				policiesData += chunk;
			});
			res.on('end', () => {
				try {
					const parsedData = JSON.parse(policiesData);
					callback(statusCode, parsedData.policies);
				} catch (e) {
					console.error(e.message);
				}
			});
		}).on('error', (e) => {
			console.error(`Got error: ${e.message}`);
		});
	}
}

module.exports = Policie;