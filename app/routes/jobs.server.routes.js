'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var jobs = require('../../app/controllers/jobs');

	// Jobs Routes
	app.route('/jobs')
		.get(jobs.list)
		.post(users.requiresLogin, jobs.create);

	app.route('/jobs/:jobId')
		.get(jobs.read)
		.put(users.requiresLogin, jobs.hasAuthorization, jobs.update)
		.delete(users.requiresLogin, jobs.hasAuthorization, jobs.delete);

	app.route('/jobs/apply/:jobId')
		.put(jobs.apply);
    app.route('/jobs/onePlusView/:jobId')
		.put(jobs.onePlusView);
		app.route('/jobs/getPaginatedCandidates/:jobId')
		.put(jobs.getPaginatedCandidates);
	app.route('/jobs/candidates/:jobId')
		.get(jobs.getJobCandidates);

	app.route('/jobs/addToShortList/:jobId')
		.put(jobs.addToShortList);

	app.route('/jobs/removeFromShortList/:jobId')
		.put(jobs.removeFromShortList);


	app.route('/jobs/shortListedCandidates/:jobId')
		.get(jobs.getShortListedCandidates);

	
	// Finish by binding the Job middleware
	app.param('jobId', jobs.jobByID);
};