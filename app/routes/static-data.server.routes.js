'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
	var countries = require('../../app/controllers/country');
	app.route('/countries')
		.get(countries.list);

	app.route('/countries/:countryName')
		.get(countries.read);

	app.param('countryName', countries.countryByName);

	//Routes for Industry - Job_Role
	var industries = require('../../app/controllers/industry');
	app.route('/industries')
		.get(industries.list);

	app.route('/industries/:industryName')
		.get(industries.read);

	app.param('industryName', industries.industryByName);

	// //Routes for Job_Role Data
	// var jobRoles = require('../../app/controllers/job-role-data');
	// app.route('/jobRoles')
	// 	.get(jobRoles.list);

	// app.route('/jobRoles/:jobRoleName')
	// 	.get(jobRoles.read);

	// app.param('jobRoleName', jobRoles.jobRoleByName);


};