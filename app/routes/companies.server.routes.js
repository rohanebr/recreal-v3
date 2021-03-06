'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var companies = require('../../app/controllers/companies');


	app.route('/uploadCompPicture').post(users.requiresLogin,companies.uploadPicture);
	app.route('/uploads/fullsize/:file').get(companies.getImage);
	// Companies Routes
	app.route('/companies')
		.get(companies.list)
		.post(users.requiresLogin, companies.create);

	app.route('/companies/:companyId')
		.get(companies.read)
		.put(users.requiresLogin, companies.hasAuthorization, companies.update)
		.delete(users.requiresLogin, companies.hasAuthorization, companies.delete);

	// Finish by binding the Company middleware
	app.param('companyId', companies.companyByID);
};