'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var candidates = require('../../app/controllers/candidates');

	// Candidates Routes




	app.route('/uploadpicture').post(users.requiresLogin, candidates.uploadPicture);
	app.route('/uploads/fullsize/:file').get(candidates.getImage);
		app.route('/candidates')
    		.get(candidates.list);
    		// .post(users.requiresLogin, candidates.create);

    	app.route('/candidates/:candidateId')
    		.get(candidates.read)
    		.put(users.requiresLogin, candidates.hasAuthorization, candidates.update)
    		.delete(users.requiresLogin, candidates.hasAuthorization, candidates.delete);


    	app.route('/candidates/deleteSkill/:candidateId')
    		.put(users.requiresLogin, candidates.hasAuthorization, candidates.deleteSkill);
    	app.route('/candidates/addSkill/:candidateId')
            .put(users.requiresLogin, candidates.hasAuthorization, candidates.addSkill);
        app.route('/candidates/deleteExperience/:candidateId')
            .put(users.requiresLogin,candidates.hasAuthorization,candidates.deleteExperience);
        app.route('/candidates/deleteProject/:candidateId')
            .put(users.requiresLogin,candidates.hasAuthorization,candidates.deleteProject);
        app.route('/candidates/updateExperience/:candidateId')
            .put(users.requiresLogin,candidates.hasAuthorization,candidates.updateExperience);
        app.route('/candidates/updateSkill/:candidateId')
    	   .put(users.requiresLogin,candidates.hasAuthorization,candidates.updateSkill);

    		// Finish by binding the Candidate middleware
            	app.param('candidateId', candidates.candidateByID);

};