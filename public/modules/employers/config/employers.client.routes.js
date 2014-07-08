'use strict';

//Setting up route
angular.module('employers').config(['$stateProvider',
	function($stateProvider) {
		// Employers state routing
		$stateProvider.
		state('listEmployers', {
			url: '/employers',
			templateUrl: 'modules/employers/views/list-employers.client.view.html'
		}).
		state('createEmployer', {
			url: '/employers/create',
			templateUrl: 'modules/employers/views/create-employer.client.view.html'
		}).
		state('viewEmployer', {
			url: '/employers/:employerId',
			templateUrl: 'modules/employers/views/view-employer.client.view.html'
		}).
		state('editEmployer', {
			url: '/employers/:employerId/edit',
			templateUrl: 'modules/employers/views/edit-employer.client.view.html'
		});
	}
]);