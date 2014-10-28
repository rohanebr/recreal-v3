'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	url = require('url'),
	LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
	config = require('../config'),
	users = require('../../app/controllers/users');

module.exports = function() {
	// Use linkedin strategy

	console.log('exports called');
	
	passport.use(new LinkedInStrategy(
               
	      {

			clientID: config.linkedin.clientID,
			clientSecret: config.linkedin.clientSecret,
			callbackURL: config.linkedin.callbackURL,
			passReqToCallback: true,
			scope: ['r_basicprofile', 'r_emailaddress']
		},
		function(req, access_token, refreshToken, profile, done) {
			// Set the provider data and include tokens
			var providerData = profile._json;
			providerData.accessToken = access_token;
			providerData.refreshToken = refreshToken;
            console.log(profile);
			// Create the user OAuth profile
			var providerUserProfile = {
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				displayName: profile.displayName,
				email: profile.emails[0].value,
				username: profile.username,
				provider: 'linkedin',
				providerIdentifierField: 'id',
				providerData: providerData
			};
       console.log(providerUserProfile);
			// Save the user OAuth profile
			users.saveOAuthUserProfile(req, providerUserProfile, done);
		}
	));
};