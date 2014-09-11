'use strict';

//Setting up route
angular.module('employer-company').config(['$stateProvider',
	function($stateProvider) {
		// Employer company state routing
		$stateProvider.
		state('employer-profile-view', {
			url: '/employer-profile-view',
			templateUrl: 'modules/employer-company/views/employer-profile-view.client.view.html'
		}).
		state('company-profile-view', {
			url: '/company-profile-view',
			templateUrl: 'modules/employer-company/views/company-profile-view.client.view.html'
		}).
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