'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users');
    var candidates = require('../../app/controllers/candidates');

    // Candidates Routes




    app.route('/uploadCandidatePicture').post(users.requiresLogin, candidates.uploadPicture);
    app.route('/uploads/fullsize/:file').get(candidates.getImage);
        app.route('/candidates')
            .get(candidates.list);
            // .post(users.requiresLogin, candidates.create);

        app.route('/candidates/:candidateId')
            .get(candidates.read)
            .put(users.requiresLogin, candidates.hasAuthorization, candidates.update)
            .delete(users.requiresLogin, candidates.hasAuthorization, candidates.delete);



        
        app.route('/candidates/addSkill/:candidateId')
            .put(users.requiresLogin, candidates.hasAuthorization, candidates.addSkill);
        app.route('/candidates/addExperience/:candidateId')
            .put(users.requiresLogin, candidates.hasAuthorization, candidates.addExperience);
        app.route('/candidates/addProject/:candidateId')
            .put(users.requiresLogin, candidates.hasAuthorization, candidates.addProject);
        app.route('/candidates/addEducation/:candidateId')
            .put(users.requiresLogin, candidates.hasAuthorization, candidates.addEducation);
        app.route('/candidates/addLanguage/:candidateId')
            .put(users.requiresLogin, candidates.hasAuthorization, candidates.addLanguage);
        app.route('/candidates/addCertificate/:candidateId')
            .put(users.requiresLogin, candidates.hasAuthorization, candidates.addCertificate);

        app.route('/candidates/deleteSkill/:candidateId')
            .put(users.requiresLogin, candidates.hasAuthorization, candidates.deleteSkill);

        app.route('/candidates/deleteExperience/:candidateId')
            .put(users.requiresLogin,candidates.hasAuthorization,candidates.deleteExperience);
        app.route('/candidates/deleteProject/:candidateId')
            .put(users.requiresLogin,candidates.hasAuthorization,candidates.deleteProject);

        app.route('/candidates/deleteEducation/:candidateId')
            .put(users.requiresLogin,candidates.hasAuthorization,candidates.deleteEducation);
        app.route('/candidates/deleteLanguage/:candidateId')
            .put(users.requiresLogin,candidates.hasAuthorization,candidates.deleteLanguage);
        app.route('/candidates/deleteCertificate/:candidateId')
            .put(users.requiresLogin,candidates.hasAuthorization,candidates.deleteCertificate);
        
        app.route('/candidates/updateExperience/:candidateId')
           .put(users.requiresLogin,candidates.hasAuthorization,candidates.updateExperience);
        app.route('/candidates/updateSkill/:candidateId')
           .put(users.requiresLogin,candidates.hasAuthorization,candidates.updateSkill);
        app.route('/candidates/updateProject/:candidateId')
           .put(users.requiresLogin,candidates.hasAuthorization,candidates.updateProject);
        app.route('/candidates/updateEducation/:candidateId')
           .put(users.requiresLogin,candidates.hasAuthorization,candidates.updateEducation);
        app.route('/candidates/updateLanguage/:candidateId')
           .put(users.requiresLogin,candidates.hasAuthorization,candidates.updateLanguage);
        app.route('/candidates/updateCertificate/:candidateId')
           .put(users.requiresLogin,candidates.hasAuthorization,candidates.updateCertificate);


            // Finish by binding the Candidate middleware
                app.param('candidateId', candidates.candidateByID);

};