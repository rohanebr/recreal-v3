'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Exam = mongoose.model('Exam'),
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
				message = 'Exam already exists';
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
 * Create a Exam
 */
exports.create = function(req, res) {
	var exam = new Exam(req.body);
	exam.user = req.user;

	exam.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(exam);
		}
	});
};

/**
 * Show the current Exam
 */
exports.read = function(req, res) {
	res.jsonp(req.exam);
};

/**
 * Update a Exam
 */
exports.update = function(req, res) {
	var exam = req.exam ;

	exam = _.extend(exam , req.body);

	exam.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(exam);
		}
	});
};

/**
 * Delete an Exam
 */
exports.delete = function(req, res) {
	var exam = req.exam ;

	exam.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(exam);
		}
	});
};


exports.saveExam = function(req, res) {
    var examTaken=req.body;
	var id=req.user._id;
	var cand = Candidate.findOne({user:id}).exec(function(err, candidate){
		candidate.examsTaken.push(examTaken);
		candidate.markModified('examsTaken');
	    candidate.save();

	    candidate.examsTaken.forEach(function (item) {
			if(item.exam==examTaken.exam){
				return res.jsonp(item);
			}
	    });
	    
	});
	console.log('method called update examTaken!!');
};


/**
 * List of Exams
 */
exports.list = function(req, res) { Exam.find().sort('-created').populate('user', 'displayName').exec(function(err, exams) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(exams);
		}
	});
};

exports.getResult = function(req, res) {
	res.jsonp(req.examTaken);
};


/**
 * Exam Result middleware
 */
exports.examResultByID = function(req, res, next, id) { 
	var userId=req.user._id;
	var cand = Candidate.findOne({user:userId}).populate('examsTaken.exam').exec(function(err, candidate){
	    candidate.examsTaken.forEach(function (item) {
			if(item._id==id){
				req.examTaken = item ;
				next();
			}
	    });
	});
};

/**
 * Exam middleware
 */
exports.examByID = function(req, res, next, id) { 
	Exam.findById(id).populate('user', 'displayName').exec(function(err, exam) {
		if (err) return next(err);
		if (! exam) return next(new Error('Failed to load Exam ' + id));
		req.exam = exam ;
		next();
	});
};

/**
 * Exam authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.exam.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};