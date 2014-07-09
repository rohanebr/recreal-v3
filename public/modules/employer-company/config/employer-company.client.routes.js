'use strict';

//Setting up route
angular.module('employer-company').config(['$stateProvider',
	function($stateProvider) {
		// Employer company state routing
		$stateProvider.
		state('employer-profile', {
			url: '/employer-profile',
			templateUrl: 'modules/employer-company/views/employer-profile.client.view.html'
		}).
		state('company-profile', {
			url: '/company-profile',
			templateUrl: 'modules/employer-company/views/company-profile.client.view.html'
		});
	}
]);