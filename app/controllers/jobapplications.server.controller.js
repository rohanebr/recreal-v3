'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Job = mongoose.model('Job'),
    _ = require('lodash');


    

/**
 * Create a Jobapplication
 */
exports.create = function(req, res) {

};

/**
 * Show the current Jobapplication
 */
exports.read = function(req, res) {

};

/**
 * Update a Jobapplication
 */
exports.update = function(req, res) {

};

/**
 * Delete an Jobapplication
 */
exports.delete = function(req, res) {

};

/**
 * List of Jobapplications
 */
exports.list = function(req, res) {

};

exports.changeStage = function(req, res) {
    if (req.user.userType === 'employer') {
	    var c;
	    var jobApplication=req.body;
		var job=req.job;

		job.jobApplications.forEach(function(item){
			if(item._id == jobApplication._id){
				item.stage = jobApplication.stage;
			}
		});
		job.markModified('jobApplications');
		job.save();
	}
    console.log('method called update job application stage!!');
};