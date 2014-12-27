'use strict';
var passport = require('passport');

module.exports = function(app) {
		// User Routes
		var users=require('../../app/controllers/users');
	var  empSignUpWizard = require('../../app/controllers/emp-sign-up-wizard');
	app.route('/empsignupwizard/signupemployer').post(empSignUpWizard.signupemployer);
	app.route('/validateTokenEmployer').post(empSignUpWizard.ValidateTokenEmployer);
	app.route('/SaveEmpSignUpWizardOneData').post(empSignUpWizard.SaveEmpSignUpWizardOneData);
	app.route('/getCountryCity').post(empSignUpWizard.getCountryCity);
	app.route('/savelatlong').post(empSignUpWizard.saveLatLong);
	app.route('/SaveEmpJobPostOneData').post(empSignUpWizard.SaveJobDataOne);
	app.route('/getCompanyByUserId').post(empSignUpWizard.companyByUserId);
//	app.param('userId', users.userByID);
};