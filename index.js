'use strict'

var app = require('./app');
var port = process.env.PORT || 3790;

app.listen(port, ()=>{
	console.log('Server ready');
});