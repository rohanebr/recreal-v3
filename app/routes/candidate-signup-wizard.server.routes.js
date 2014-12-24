'use strict';
var passport = require('passport');
module.exports = function(app) {
	// Routing logic   
	// ...
	// User Routes
		var users=require('../../app/controllers/users');
		var candidateSignUpWizard = require('../../app/controllers/candidate-signup-wizard');
		app.route('/signupcandidate').post(candidateSignUpWizard.signupcandidate);
	    app.route('/validatetoken').post(candidateSignUpWizard.ValidateToken);
	// app.route('/SaveEmpSignUpWizardOneData').post(empSignUpWizard.SaveEmpSignUpWizardOneData);
	// app.route('/getCountryCity').post(empSignUpWizard.getCountryCity);
	// app.route('/savelatlong').post(empSignUpWizard.saveLatLong);
	// app.route('/SaveEmpJobPostOneData').post(empSignUpWizard.SaveJobDataOne);
	// app.route('/getCompanyByUserId').post(empSignUpWizard.companyByUserId);
};