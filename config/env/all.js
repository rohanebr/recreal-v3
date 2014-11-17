'use strict';

module.exports = {
	app: {
		title: 'recreal',
		description: 'A realtime recruitment engine,',
		keywords: 'realtime synergetic hiring, collaboration platform for employers and candidates'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				// 'public/lib/bootstrap/dist/css/bootstrap.css',
				// 'public/lib/bootstrap/dist/css/bootstrap-theme.css'

				// careers theme

				"http://fonts.googleapis.com/css?family=Lato:300,400,700&amp;subset=latin,latin-ext",
				'http://fonts.googleapis.com/css?family=Roboto+Condensed:400,700',
				"public/careers-theme/css/font-awesome.css" ,
				"public/careers-theme/css/font-awesome-ie7.css" ,
				"public/careers-theme/css/bootstrap.css" ,
				"public/careers-theme/css/bootstrap-responsive.css",
				"public/careers-theme/css/reset.css",
				"public/careers-theme/css/color_scheme_1.css",
				"public/careers-theme/css/jquery.combosex.css",
				"public/careers-theme/css/jquery.flexslider.css",
				"public/careers-theme/css/jquery.scrollbar.css",


			],
			js: [
				// 'public/lib/jquery-slimscroll/jquery.slimscroll.js',
				
				// 'public/lib/jquery/dist/jquery.js',
				// 'public/lib/jquery-ui/jquery-ui.js',




				// careers theme
				"public/careers-theme/js/jquery.1.7.2.min.js",
				"public/careers-theme/js/jquery-ui.1.7.2.min.js",
				"http://maps.google.com/maps/api/js?sensor=false",
				"public/careers-theme/js/jquery.combosex.min.js",
				"public/careers-theme/js/jquery.flexslider-min.js",
				"public/careers-theme/js/jquery.mousewheel.js",
				"public/careers-theme/js/jquery.easytabs.min.js",
				"public/careers-theme/js/jquery.gmap.min.js",
				"public/careers-theme/js/jquery.scrollbar.min.js",
				"public/careers-theme/js/jQuery.menutron.js",
				"public/careers-theme/js/jquery.isotope.min.js",
				"public/careers-theme/js/custom.js",



				'public/lib/angular/angular.min.js',
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
				'public/lib/ngmap/build/scripts/ng-map.js'
				// 'http://maps.google.com/maps/api/js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};