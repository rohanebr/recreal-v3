'use strict';
var passport = require('passport');

module.exports = function(app) {
		// User Routes
		var users=require('../../app/controllers/users');
	var  empSignUpWizard = require('../../app/controllers/emp-sign-up-wizard');
	app.route('/signupemployer').post(empSignUpWizard.signupemployer);
//	app.param('userId', users.userByID);
};