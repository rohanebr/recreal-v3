'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Candidate = mongoose.model('Candidate'),
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
				message = 'Candidate already exists';
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
 * Create a Candidate
 */
// exports.create = function(req, res) {
// 	var candidate = new Candidate(req.body);
// 	candidate.user = req.user;
// 	req.user.candidate = candidate;
// 	req.user.save();

// 	candidate.save(function(err) {
// 		if (err) {
// 			return res.send(400, {
// 				message: getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(candidate);
// 		}
// 	});
// };

/**
 * Show the current Candidate
 */
exports.read = function(req, res) {
	res.jsonp(req.candidate);
};

/**
 * Update a Candidate
 */
exports.update = function(req, res) {
	var candidate = req.candidate ;

	candidate = _.extend(candidate , req.body);

	candidate.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(candidate);
		}
	});
};

/**
 * Delete an Candidate
 */
exports.delete = function(req, res) {
	var candidate = req.candidate ;

	candidate.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(candidate);
		}
	});
};

/**
 * List of Candidates
 */
exports.list = function(req, res) { Candidate.find().sort('-created').populate('user', 'displayName').exec(function(err, candidates) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(candidates);
		}
	});
};

/**
 * Candidate middleware
 */
exports.candidateByID = function(req, res, next, id) { Candidate.findById(id).populate('user', 'displayName').exec(function(err, candidate) {
		if (err) return next(err);
		if (! candidate) return next(new Error('Failed to load Candidate ' + id));
		req.candidate = candidate ;
		next();
	});
};

/**
 * Candidate authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.candidate.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};