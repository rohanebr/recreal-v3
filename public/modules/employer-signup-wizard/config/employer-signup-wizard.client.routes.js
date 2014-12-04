'use strict';

//Setting up route
angular.module('employer-signup-wizard').config(['$stateProvider',
	function($stateProvider) {
		// Employer signup wizard state routing
		$stateProvider.
		state('emp-wizard-two', {
			url: '/emp-wizard-two',
			templateUrl: 'modules/employer-signup-wizard/views/emp-wizard-two.client.view.html'
		}).
		state('emp-wizard-one', {
			url: '/emp-wizard-one',
			templateUrl: 'modules/employer-signup-wizard/views/emp-wizard-one.client.view.html'
		});
	}
]);