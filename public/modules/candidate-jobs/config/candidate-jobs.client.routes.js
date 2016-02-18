'use strict';

//Setting up route
angular.module('candidate-jobs').config(['$stateProvider',
	function($stateProvider) {
		// Candidate jobs state routing
		$stateProvider.
		state('candidate-applied-jobs', {
			url: '/candidate-applied-jobs',
			templateUrl: 'modules/candidate-jobs/views/candidate-applied-jobs.client.view.html'
		}).
		state('candidate-open-jobs', {
			url: '/candidate-open-jobs',
			templateUrl: 'modules/candidate-jobs/views/candidate-open-jobs.client.view.html'
		}).
		state('search-jobs', {
			url: '/search-jobs/:keyword',
			templateUrl: 'modules/candidate-jobs/views/search-jobs.client.view.html'
		}).
		state('jobs-near-me', {
			url: '/jobs-near-me',
			templateUrl: 'modules/candidate-jobs/views/jobs-near-me.client.view.html'
		});
	}
]);