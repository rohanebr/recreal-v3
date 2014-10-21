'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var exams = require('../../app/controllers/exams');

	// Exams Routes
	app.route('/exams')
		.get(exams.list)
		.post(users.requiresLogin, exams.create);

	app.route('/examResult/:examTakenId')
		.get(exams.getResult);

	app.route('/exams/:examId')
		.get(exams.read)
		.put(users.requiresLogin, exams.hasAuthorization, exams.update)
		.delete(users.requiresLogin, exams.hasAuthorization, exams.delete);

	app.route('/exams/saveExam/:examId')
         .put(users.requiresLogin,exams.saveExam);	


	// Finish by binding the Exam middleware
	app.param('examTakenId', exams.examResultByID);

	// Finish by binding the Exam middleware
	app.param('examId', exams.examByID);
};