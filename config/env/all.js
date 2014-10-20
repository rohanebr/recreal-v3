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
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css'
			],
			js: [
				'pulic/lib/jquery/dist/jquery.js',
				'public/lib/jquery-slimscroll/jquery.slimscroll.js',
				'public/lib/jquery-ui/jquery-ui.j',
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
				'public/lib/angular-ui-date/src/date.js',
				'public/lib/ng-file-upload/angular-file-upload-shim.js',
				'public/lib/ng-file-upload/angular-file-upload-html5-shim.js',
				'public/lib/ng-file-upload/angular-file-upload.js',
				'public/lib/textAngular/dist/textAngular-sanitize.min.js',
				'public/lib/textAngular/dist/textAngular.min.js'
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