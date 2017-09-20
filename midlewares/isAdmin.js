'use strict'

exports.isAdmin = (req, res, next)=>{

	if(req.user.role !== 'admin'){
		return res.status(404).send({ message: 'Not authorized' })
	}

	next();

}