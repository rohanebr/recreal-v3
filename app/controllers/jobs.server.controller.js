'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Job = mongoose.model('Job'),
	Employer = mongoose.model('Employer'),
	Candidate = mongoose.model('Candidate'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {

	var message = '';
	if(err.message)
		message = err.message;
	

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Job already exists';
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
 * Create a Job
 */
exports.create = function(req, res) {
	console.log(req.user.candidate);
	if(req.user.userType === 'employer'){
		var job = new Job(req.body);
		job.user = req.user;
		console.log(req.user._id);

		var emp = Employer.find({user: req.user._id}).populate('company').exec(function(err, employers){
			console.log(employers[0]._id);
			job.employer = employers[0]._id;
			job.company = employers[0].company._id;
			employers[0].jobs.push(job);
			var company = employers[0].company;
			company.jobs.push(job);
			company.save();
			job.save(function(err) {
				if (err) {
					return res.send(400, {
						message: getErrorMessage(err)
					});
				} else {
					employers[0].save();
					res.jsonp(job);
				}
			});
		});
	}
	


	
};

/**
 * Show the current Job
 */
exports.read = function(req, res) {
	res.jsonp(req.job);
};

/**
 * Apply for a Job

exports.apply = function(req, res) {
	console.log(req.user.candidate);
	if(req.user.userType === 'candidate'){
		var job = req.job;
		job = _.extend(job , req.body);
		var candidate = Candidate.findOne({user: req.user._id}).exec(function(err, candidate){
			job.candidates.push(candidate);
			candidate.jobs.push(job);
			job.save(function(err) {
				if (err) {
					return res.send(400, {
						message: getErrorMessage(err)
					});
				} else {
					candidate.save();
					res.jsonp(job);
				}
			});
		});
	}	
};

 */

exports.apply = function(req, res, next) {
	var ObjectId = require('mongoose').Types.ObjectId;

	if(req.user.userType === 'candidate'){
		var job = req.job;
		job = _.extend(job , req.body);
		Candidate.findOne({user: req.user._id}).exec(function(err, candidate){
			Job.findOne({_id: job._id})
			.where({candidates: candidate._id})
			.exec(function(err, doc){
				if(!doc)
				{
					job.apply(candidate);
					res.jsonp(req.job);
				}
			});			
		});
	}	
};


/**
 * Update a Job
 */
exports.update = function(req, res) {
	var job = req.job ;

	job = _.extend(job , req.body);

	job.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(job);
		}
	});
};

/**
 * Delete an Job
 */
exports.delete = function(req, res) {
	var job = req.job ;

	job.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(job);
		}
	});
};

/**
 * List of Jobs
 */
exports.list = function(req, res) { Job.find().sort('-created').populate('user', 'displayName').populate('company').exec(function(err, jobs) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(jobs);
		}
	});
};

/**
 * Job middleware
 */
exports.jobByID = function(req, res, next, id) { Job.findById(id).populate('user', 'displayName').exec(function(err, job) {
		if (err) return next(err);
		if (! job) return next(new Error('Failed to load Job ' + id));
		req.job = job ;
		next();
	});
};

/**
 * Job authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.job.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};