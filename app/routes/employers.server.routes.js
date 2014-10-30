'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var employers = require('../../app/controllers/employers');

	app.route('/uploadpicture').post(users.requiresLogin, employers.uploadPicture);
	app.route('/uploads/fullsize/:file').get(employers.getImage);

		// Employers Routes
	app.route('/employers')
		.get(employers.list);
		// .post(users.requiresLogin, employers.create);

	app.route('/employers/:employerId')
		.get(employers.read)
		.put(users.requiresLogin, employers.hasAuthorization, employers.update)
		.delete(users.requiresLogin, employers.hasAuthorization, employers.delete);

	// Finish by binding the Employer middleware
	app.param('employerId', employers.employerByID);
};