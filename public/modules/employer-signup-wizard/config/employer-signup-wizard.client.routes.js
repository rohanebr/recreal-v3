'use strict';

//Setting up route
angular.module('employer-signup-wizard').config(['$stateProvider','$urlRouterProvider',
	function($stateProvider,$urlRouterProvider) {
			$urlRouterProvider.otherwise('/');
		// Employer signup wizard state routing
		$stateProvider.
		state('signup-email-activation', {
			url: '/signup-email-activation',
			templateUrl: 'modules/employer-signup-wizard/views/signup-email-activation.client.view.html'
		}).
		state('emp-wizard-two', {
			url: '/emp-wizard-two',
			templateUrl: 'modules/employer-signup-wizard/views/emp-wizard-two.client.view.html'
		}).
		state('emp-wizard-one', {
			url: '/emp-wizard-one',
			templateUrl: 'modules/employer-signup-wizard/views/emp-wizard-one.client.view.html'
		}).
		state('emp-wizard-one-new', {
			url: '/emp-wizard-one-new',
			templateUrl: 'modules/employer-signup-wizard/views/partials/emp-wizard-one-new.client.view.html',
			controller: 'EmpWizardOneController'
		}).
		state('emp-wizard-one-new.basicinfo', {
			url: '/basicinfo',
			templateUrl: 'modules/employer-signup-wizard/views/partials/basic-info.client.view.html'
			
		});
	}
]);