'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
JobRole = mongoose.model('Jobrole'),
    _ = require('lodash');

/**
 * Create a Job role datum
 */
exports.create = function(req, res) {

};

/**
 * Show the current Job role datum
 */
exports.read = function(req, res) {
	res.jsonp(req.jobRole);
};

/**
 * Update a Job role datum
 */
exports.update = function(req, res) {

};

/**
 * Delete an Job role datum
 */
exports.delete = function(req, res) {

};

exports.jobRoleByName = function(req, res, next, name) { JobRole.findOne({name:name}).exec(function(err, jobRole) {
		if (err) return next(err);
		if (! jobRole) return next(new Error('Failed to load jobRole ' + name));
		req.jobRole = jobRole ;
		next();
	});
};

/**
 * List of Job role data
 */
exports.list = function(req, res) {
	JobRole.find().select('name').sort('-name').exec(function(err, jobRoles) {
	if (err) {
		return res.send(400, {
			message: getErrorMessage(err)
		});
	} else {
		res.jsonp(jobRoles);
	}
	});
};