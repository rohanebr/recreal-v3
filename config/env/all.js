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

				"public/theme/css/bootstrap.css" ,
				"public/theme/css/animate.css" ,
				"public/theme/css/font-awesome.min.css" ,
				"public/theme/css/icon.css" ,
				"public/theme/css/font.css" ,
				"public/theme/css/app.css" ,
				"public/theme/js/calendar/bootstrap_calendar.css" ,


				//toaster
				'public/lib/angularjs-toaster/toaster.css'


			],
			js: [


				// scale theme

				"public/theme/js/jquery.min.js" ,
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
				"public/theme/js/charts/flot/demo.js" ,

				"public/theme/js/calendar/bootstrap_calendar.js" ,
				"public/theme/js/calendar/demo.js" ,

				"public/theme/js/sortable/jquery.sortable.js" ,

				"public/theme/js/app.plugin.js" ,
				
				


				// 'public/lib/jquery-slimscroll/jquery.slimscroll.js',
				
				// 'public/lib/jquery/dist/jquery.js',
				'public/lib/jquery-ui/jquery-ui.js',


				

				
				



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
				'public/lib/ng-sortable/dist/ng-sortable.js',
				'http://maps.google.com/maps/api/js',


				//angularjs-toaster
				//https://github.com/jirikavi/AngularJS-Toaster

				
				
				'http://code.angularjs.org/1.3.2/angular-animate.min.js',
				'public/lib/angularjs-toaster/toaster.js'
				


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