'use strict';

//Setting up route
angular.module('rozeeJobs').config(['$stateProvider',
	function($stateProvider) {
		// Jobs state routing
		$stateProvider.
    	state('rozeeviewJob', {
			url: '/rozeeJobs/:jobId',
			templateUrl: 'modules/rozee-jobs/views/view-rozee-job.client.view.html'
		});
	
	}
]);