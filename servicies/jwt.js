'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'secret';

exports.createToken = (user)=>{
	var payload = {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
		createdAt: moment().unix(),
		expirationAt: moment().add(30, 'days').unix()
	}

	return jwt.encode(payload, secret);

}