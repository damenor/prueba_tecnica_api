'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'secret';

exports.ensureAuth = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).send({
			message: 'La petición no tiene la cabecera de autenticación'
		})
	}

	var token = req.headers.authorization.replace(/['"]+/g, '')

	try {
		var payload = jwt.decode(token, secret);
		if (payload.expirationAt <= moment.unix) {
			return res.status(404).send({
				message: 'El token ha expirado'
			})
		}
	} catch (error) {
		return res.status(404).send({
			message: 'El token no es válido'
		})
	}

	req.user = payload;

	next();

}