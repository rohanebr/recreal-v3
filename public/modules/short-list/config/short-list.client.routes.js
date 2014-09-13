'use strict';

//Setting up route
angular.module('short-list').config(['$stateProvider',
	function($stateProvider) {
		// Short list state routing
		$stateProvider.
		state('shortlisted-candidates', {
			url: '/shortlisted-candidates/:jobId',
			templateUrl: 'modules/short-list/views/shortlisted-candidates.client.view.html'
		});
	}
]);