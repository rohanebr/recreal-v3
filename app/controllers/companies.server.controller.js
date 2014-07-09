'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Company = mongoose.model('Company'),
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
				message = 'Company already exists';
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
 * Create a Company
 */
exports.create = function(req, res) {
	var company = new Company(req.body);
	company.user = req.user;

	company.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(company);
		}
	});
};

/**
 * Show the current Company
 */
exports.read = function(req, res) {
	res.jsonp(req.company);
};

/**
 * Update a Company
 */
exports.update = function(req, res) {
	var company = req.company ;

	company = _.extend(company , req.body);

	company.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(company);
		}
	});
};

/**
 * Delete an Company
 */
exports.delete = function(req, res) {
	var company = req.company ;

	company.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(company);
		}
	});
};

/**
 * List of Companies
 */
exports.list = function(req, res) { Company.find().sort('-created').populate('user', 'displayName').exec(function(err, companies) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(companies);
		}
	});
};

/**
 * Company middleware
 */
exports.companyByID = function(req, res, next, id) { Company.findById(id).populate('user', 'displayName').exec(function(err, company) {
		if (err) return next(err);
		if (! company) return next(new Error('Failed to load Company ' + id));
		req.company = company ;
		next();
	});
};

/**
 * Company authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.company.employers.indexOf(req.user.employer) === -1){
		return res.send(403, 'User is not authorized');
	}
	next();
};