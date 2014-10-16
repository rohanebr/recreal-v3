'use strict';

module.exports = {
	db: 'mongodb://localhost/recreal-dev',
	app: {
		title: 'recreal - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '825164230879957',
		clientSecret: process.env.FACEBOOK_SECRET || '5dae2d2016fca5f8b4cee37aefd8a003',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '775079096211-k74j9b4l6j294rhqudifddsnnam499dr.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'aLUCNiviRoTkF943I0okuksj',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'cheq81slu4pe',
		clientSecret: process.env.LINKEDIN_SECRET || 'mbCnZofMsah7ilQc',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	}
};