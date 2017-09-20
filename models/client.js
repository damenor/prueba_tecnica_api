'use strict'

class Client {

	constructor() {
		this.http = require('http');
		this.url = 'http://www.mocky.io/v2/5808862710000087232b75ac';
	}

	/*
	* Get one client by id
	*@Params clientId: number, callback: function
	*/
	getOneById(clientId, callback) {
		this.getAll((status, clients) => {
			clients.filter((e) => {
				if (clientId === e.id) return callback(status, e);
			});
			return callback(status, null);
		})
	}

	/*
	* Get one client by name
	*@Params clientName: string, callback: function
	*/
	getOneByName(clientName, callback) {
		this.getAll((status, clients) => {
			clients.filter((e) => {
				if (clientName === e.name) return callback(status, e);
			});
			return callback(status, null);
		})
	}

	/*
	* Get one client by email
	*@Params clientEmail: string, callback: function
	*/
	getOneByEmail(clientEmail, callback) {
		this.getAll((status, clients) => {
			clients.filter((e) => {
				if (clientEmail === e.email) return callback(status, e);
			});
			return callback(status, null);
		})
	}

	/*
	* Get all clients order by id
	*@Params callback: function
	*/
	getAllById(callback) {
		this.getAll((status, clients) => {
			let clientsById = clients.sort((a, b) => {
				if (a.id < b.id) return -1;
				if (a.id > b.id) return 1;
				return 0;
			})
			callback(status, clientsById);
		})
	}

	/*
	* Get all clients order by id descendent
	*@Params callback: function
	*/
	getAllByIdDes(callback) {
		this.getAll((status, clients) => {
			let clientsById = clients.sort((a, b) => {
				if (a.id < b.id) return 1;
				if (a.id > b.id) return -1;
				return 0;
			})
			callback(status, clientsById);
		})
	}

	/*
	* Get all clients order by name
	*@Params callback: function
	*/
	getAllByName(callback) {
		this.getAll((status, clients) => {
			let clientsByName = clients.sort((a, b) => {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			})
			callback(status, clientsByName);
		})
	}

	/*
	* Get all clients order by name descendent
	*@Params callback: function
	*/
	getAllByNameDes(callback) {
		this.getAll((status, clients) => {
			let clientsByName = clients.sort((a, b) => {
				if (a.name < b.name) return 1;
				if (a.name > b.name) return -1;
				return 0;
			})
			callback(status, clientsByName);
		})
	}

	/*
	* Get all clients
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
			let clientsData = '';
			res.on('data', (chunk) => {
				clientsData += chunk;
			});
			res.on('end', () => {
				try {
					const parsedData = JSON.parse(clientsData);
					callback(statusCode, parsedData.clients);
				} catch (e) {
					console.error(e.message);
				}
			});
		}).on('error', (e) => {
			console.error(`Got error: ${e.message}`);
		});
	}
}

module.exports = Client;