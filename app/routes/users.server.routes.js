'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users');
	app.route('/users/me').get(users.me);
	app.route('/users').put(users.update);
	app.route('/users/accounts').delete(users.removeOAuthProvider);

	// Setting up the users password api
	app.route('/users/password').post(users.changePassword);
	app.route('/auth/forgot').post(users.forgot);
	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);

	// Setting up the users api
	app.route('/auth/signup').post(users.signup);
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);

	// Setting the facebook oauth routes
	app.route('/auth/facebook').get(passport.authenticate('facebook', {
		scope: ['email']
	}));
	app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

	// Setting the twitter oauth routes
	app.route('/auth/twitter').get(passport.authenticate('twitter'));
	app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

	// Setting the google oauth routes
	app.route('/auth/google').get(passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));

	app.route('/users/sendMessage/:userId')
		.put(users.sendMessage);
		app.route('/users/addSubscriber/:userId')
		.put(users.addSubscriber);
			app.route('/users/deleteSubscriber/:userId')
		.put(users.deleteSubscriber);
	app.route('/users/getMessages/:userId')
		.get(users.getMessages);
		app.route('/users/setUserType/:userId')
		.put(users.setUserType);
app.route('/users/readNotification/:userId')
		.post(users.readNotification);

	// app.route('/users/thread/:userId')
	// 	.get(user.getthreads);

	app.route('/auth/google/callback').get(users.oauthCallback('google'));

		// Setting the linkedin oauth routes
	app.route('/auth/linkedin').get(passport.authenticate('linkedin', {state: 'some state'}));
	app.route('/auth/linkedin/callback').get(users.oauthCallback('linkedin'));



        // get candidate's linkedin profile

    app.route('/users/linkedInProfile/:userId')
    	.get(users.getLinkedInProfile);

	// Finish by binding the user middleware
	app.param('userId', users.userByID);

	
};