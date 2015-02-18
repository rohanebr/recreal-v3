'use strict';

//Setting up route
angular.module('job-applications').config(['$stateProvider',
	function($stateProvider) {
		// Job applications state routing
		$stateProvider.
		state('employer-job-candidates', {
			url: '/employer-job-candidates/:jobId',
			templateUrl: 'modules/job-applications/views/employer-job-candidates.client.view.html'
		});
	}
]);