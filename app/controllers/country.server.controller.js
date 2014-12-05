'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Country = mongoose.model('Country'),
    _ = require('lodash');

/**
 * Create a Country
 */
exports.create = function(req, res) {

};

/**
 * Show the current Country
 */
exports.read = function(req, res) {

};

/**
 * Update a Country
 */
exports.update = function(req, res) {

};

/**
 * Delete an Country
 */
exports.delete = function(req, res) {

};

/**
 * List of Countries
 */
exports.list = function(req, res) { 
	Country.find().select('name').sort('-name').exec(function(err, countries) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(countries);
		}
	});
};