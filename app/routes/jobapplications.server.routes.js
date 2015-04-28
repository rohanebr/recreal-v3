'use strict';

module.exports = function(app) {

	var users = require('../../app/controllers/users');
	var jobapplications = require('../../app/controllers/jobapplications');
	var jobs = require('../../app/controllers/jobs');

	// Routing logic   
	// ...   
	app.route('/jobs/changeApplicantStage/:jobId')
	.put(jobapplications.changeStage);
	app.route('/jobs/addInterviewDate/:jobId').put(jobapplications.addInterviewDate);

	// Finish by binding the Job middleware
	app.param('jobId', jobs.jobByID);

};