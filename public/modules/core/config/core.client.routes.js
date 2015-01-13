'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('employer-landing', {
			url: '/employer-landing',
			templateUrl: 'modules/core/views/employer-landing.client.view.html'
		}).
		state('test', {
			url: '/test',
			templateUrl: 'modules/core/views/test.client.view.html'
		}).
		state('transition', {
			url: '/transition',
			templateUrl: 'modules/core/views/transition.client.view.html',
			controller: 'TransitionController'
		}).
		state('transition.userType', {
			url: '/userType',
			templateUrl: 'modules/core/views/transition-userType.client.view.html'
			
		}).state('transition.importCv', {
			url: '/importCv',
			templateUrl: 'modules/core/views/transition-importCv.client.view.html'
			
		}).
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/landing-page/index.html'
		}).
		state('employerDashboard', {
			url: '/employer',
			templateUrl: 'modules/core/views/employer-home.client.view.html'
		}).
		state('candidateDashboard', {
			url: '/candidate',
			templateUrl: 'modules/core/views/candidate-home.client.view.html'
		});
	}
]);
