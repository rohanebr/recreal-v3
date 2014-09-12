'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var candidates = require('../../app/controllers/candidates');

	// Candidates Routes
	app.route('/candidates')
		.get(candidates.list);
		// .post(users.requiresLogin, candidates.create);

	app.route('/candidates/:candidateId')
		.get(candidates.read)
		.put(users.requiresLogin, candidates.hasAuthorization, candidates.update)
		.delete(users.requiresLogin, candidates.hasAuthorization, candidates.delete);

	app.route('/candidates/deleteSkill')
		.put(users.requiresLogin, candidates.hasAuthorization, candidates.deleteSkill);

	// Finish by binding the Candidate middleware
	app.param('candidateId', candidates.candidateByID);

	app.route('/uploadpicture').post(users.requiresLogin, candidates.uploadPicture);
	app.route('/uploads/fullsize/:file').get(candidates.getImage);


};