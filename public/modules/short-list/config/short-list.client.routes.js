'use strict';

//Setting up route
angular.module('short-list').config(['$stateProvider',
	function($stateProvider) {
		// Short list state routing
		$stateProvider.
		state('shortlisted-candidates-skeleton', {
			url: '/shortlisted-candidates-skeleton',
			templateUrl: 'modules/core/views/shortlisted-candidates-skeleton.client.view.html'
		}).
		
		state('shortlisted-candidates', {
			url: '/shortlisted-candidates/:jobId',
			templateUrl: 'modules/short-list/views/shortlisted-candidates.client.view.html',
			controller: 'ShortlistedCandidatesController'
		}).
		state('shortlisted-candidates-test',{
            url: '/test',
			templateUrl: 'modules/short-list/views/shortlisted-candidates-test.client.view.html',
			controller: 'CandidatesTestController'

		});
	}
]);