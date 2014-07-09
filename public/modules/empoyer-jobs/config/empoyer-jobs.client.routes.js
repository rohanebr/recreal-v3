'use strict';

//Setting up route
angular.module('empoyer-jobs').config(['$stateProvider',
	function($stateProvider) {
		// Empoyer jobs state routing
		$stateProvider.
		state('employer-job-candidates', {
			url: '/employer-job-candidates',
			templateUrl: 'modules/empoyer-jobs/views/employer-job-candidates.client.view.html'
		}).
		state('company-open-jobs', {
			url: '/company-open-jobs',
			templateUrl: 'modules/empoyer-jobs/views/company-open-jobs.client.view.html'
		}).
		state('post-job', {
			url: '/post-job',
			templateUrl: 'modules/empoyer-jobs/views/post-job.client.view.html'
		});
	}
]);