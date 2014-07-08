'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Employer = mongoose.model('Employer'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Employer already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create an Employer
 */
// exports.create = function(req, res) {
// 	var employer = new Employer(req.body);
// 	employer.user = req.user;

// 	employer.save(function(err) {
// 		if (err) {
// 			return res.send(400, {
// 				message: getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(employer);
// 		}
// 	});
// };

/**
 * Show the current Employer
 */
exports.read = function(req, res) {
	res.jsonp(req.employer);
};

/**
 * Update a Employer
 */
exports.update = function(req, res) {
	var employer = req.employer ;

	employer = _.extend(employer , req.body);

	employer.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(employer);
		}
	});
};

/**
 * Delete an Employer
 */
exports.delete = function(req, res) {
	var employer = req.employer ;

	employer.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(employer);
		}
	});
};

/**
 * List of Employers
 */
exports.list = function(req, res) { Employer.find().sort('-created').populate('user', 'displayName').populate('jobs').exec(function(err, employers) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(employers);
		}
	});
};

/**
 * Employer middleware
 */
exports.employerByID = function(req, res, next, id) { Employer.findById(id).populate('user', 'displayName').exec(function(err, employer) {
		if (err) return next(err);
		if (! employer) return next(new Error('Failed to load Employer ' + id));
		req.employer = employer ;
		next();
	});
};

/**
 * Employer authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.employer.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};