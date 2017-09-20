'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

/* Routes */
var clientRoutes = require('./routes/client');
var policieRoutes = require('./routes/policie');

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

/* Headers */
app.use((req, res, next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers', 
		'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET');
	res.header('Allow', 'GET');
	next();
})

app.use('/api', clientRoutes);
app.use('/api', policieRoutes);

app.get('/info', (req, res)=>{
	res.status(200).send({ 
		url: 'http://localhost:3790/api/', 
		routes: {
			client: {
				login: '/login',
				clientById: '/client/:id',
				clientByName: '/clientByName/:name',
				all: '/clients',
				allById: '/clientsById',
				allByIdDes: '/clientsByIdDes',
				allByName: '/clientsByName',
				allByNameDes: '/clientsByNameDes',
			}, 
			policie: {
				all: '/policie',
				policieById: '/policie/:id',
				policiesByClient: '/policiesByClient/:clientId',
				clientByPolicie: '/clientByPolicie/:policieId',
				policieById: '/policieById',
				policieByIdDes: '/policieByIdDes',
			}
		}, 
		authorization: {
			user: 'client', 
			admin: 'all'
		}
	})
});

module.exports = app;
