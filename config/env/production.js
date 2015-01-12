'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://muddaserahmed:sqlserver1@ds041380.mongolab.com:41380/recreal',
	assets: {
		lib: {
			css: [
				// 'public/lib/bootstrap/dist/css/bootstrap.css',
				// 'public/lib/bootstrap/dist/css/bootstrap-theme.css'

				// careers theme

				"public/theme/css/bootstrap.css" ,
				"public/theme/css/animate.css" ,
				"public/theme/css/font-awesome.min.css" ,
				"public/theme/css/icon.css" ,
				"public/theme/css/font.css" ,
				"public/theme/css/app.css",
				"public/theme/js/calendar/bootstrap_calendar.css",
  			    "public/lib/angularjs-toaster/toaster.css"


			],
			js: [


				// scale theme

				"public/theme/js/jquery.min.js" ,
				"public/lib/angular/angular.min.js",
				// <!-- Bootstrap -->
				"public/theme/js/bootstrap.js" ,
				// <!-- App -->
				"public/theme/js/app.js" ,
				"public/theme/js/slimscroll/jquery.slimscroll.min.js" ,
				"public/theme/js/charts/easypiechart/jquery.easy-pie-chart.js" ,
				"public/theme/js/charts/sparkline/jquery.sparkline.min.js" ,
				"public/theme/js/charts/flot/jquery.flot.min.js" ,
				"public/theme/js/charts/flot/jquery.flot.tooltip.min.js" ,
				"public/theme/js/charts/flot/jquery.flot.spline.js" ,
				"public/theme/js/charts/flot/jquery.flot.pie.min.js" ,
				"public/theme/js/charts/flot/jquery.flot.resize.js" ,
				"public/theme/js/charts/flot/jquery.flot.grow.js" ,
				"public/theme/js/calendar/bootstrap_calendar.js" ,
				"public/theme/js/sortable/jquery.sortable.js" ,
				"public/theme/js/app.plugin.js" ,
				'public/lib/jquery-ui/jquery-ui.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
				'public/lib/bootstrap/dist/js/bootstrap.js',
				'public/lib/angular-socket-io/socket.js',
				'public/lib/socket.io-client/socket.io.js',
				'public/lib/angular-timer/dist/angular-timer.js',
				'public/lib/angular-charts/dist/angular-charts.js',
				'public/lib/d3/d3.js',
				'public/lib/angularjs-geolocation/src/geolocation.js',
				'public/lib/angular-ui-date/src/date.js',
				'public/lib/ng-file-upload/angular-file-upload-shim.js',
				'public/lib/ng-file-upload/angular-file-upload-html5-shim.js',
				'public/lib/ng-file-upload/angular-file-upload.js',
				'public/lib/textAngular/dist/textAngular-sanitize.min.js',
				'public/lib/textAngular/dist/textAngular.min.js',
				'public/lib/ng-sortable/dist/ng-sortable.js',
				'https://maps.google.com/maps/api/js?sensor=false',
			    'public/lib/ngmap/build/scripts/ng-map.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angularjs-toaster/toaster.js'
				


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
		callbackURL: 'http://recreal.com/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'cheq81slu4pe',
		clientSecret: process.env.LINKEDIN_SECRET || 'mbCnZofMsah7ilQc',
		callbackURL: 'http://recreal.com/auth/linkedin/callback'
	}
};