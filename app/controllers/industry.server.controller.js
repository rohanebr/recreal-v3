'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Industry = mongoose.model('Industry'),
    _ = require('lodash');

/**
 * Create a Industry
 */
exports.create = function(req, res) {

};

/**
 * Show the current Industry
 */
exports.read = function(req, res) {
	res.jsonp(req.industry);
};

/**
 * Update a Industry
 */
exports.update = function(req, res) {

};

/**
 * Delete an Industry
 */
exports.delete = function(req, res) {

};

exports.industryByName = function(req, res, next, name) { Industry.findOne({name:name}).exec(function(err, industry) {
		if (err) return next(err);
		if (! industry) return next(new Error('Failed to load industry ' + name));
		req.industry = industry ;
		next();
	});
};

/**
 * List of Industries
 */
exports.list = function(req, res) {
	Industry.find().select('name').sort('-name').exec(function(err, industries) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(industries);
		}
	});
};