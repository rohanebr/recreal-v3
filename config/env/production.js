'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://muddaserahmed:sqlserver1@ds041380.mongolab.com:41380/recreal',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
			],
			js: [
				'public/lib/angular/angular.min.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
				'public/lib/bootstrap/dist/js/bootstrap.js',
				'public/lib/angular-socket-io/socket.js',
				'public/lib/socket.io-client/socket.io.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
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