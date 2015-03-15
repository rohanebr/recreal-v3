'use strict';

//Setting up route
angular.module('job-applications').config(['$stateProvider',
	function($stateProvider) {
		// Job applications state routing
		$stateProvider.
		state('employer-job-candidates', {
			url: '/employer-job-candidates/:jobId',
			templateUrl: 'modules/job-applications/views/employer-job-candidates.client.view.html'
		})
		.state('employer-job-candidates.all', {
			url: '/all',
			templateUrl: 'modules/job-applications/views/employer-job-candidates.client.all.view.html'
		})
		.state('employer-job-candidates.interview', {
			url: '/interview',
			templateUrl: 'modules/job-applications/views/employer-job-candidates.interview.client.view.html'
		})
		.state('employer-job-candidates.exam', {
			url: '/exam',
			templateUrl: 'modules/job-applications/views/employer-job-candidates.exam.client.view.html'
		})
		.state('employer-job-candidates.stage', {
			url: '/:stage',
			templateUrl: 'modules/job-applications/views/employer-job-candidates.exam.client.view.html'
		});
	}
]);