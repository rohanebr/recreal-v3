'use strict';

//Setting up route
angular.module('candidate-features').config(['$stateProvider',
	function($stateProvider) {
		// Candidate features state routing
		$stateProvider.
		state('edit-cv', {
			url: '/edit-cv',
			templateUrl: 'modules/candidate-features/views/edit-cv.client.view.html'
		}).
		state('candidate-home', {
			url: '/candidate-home',
			templateUrl: 'modules/candidate-features/views/candidate-home.client.view.html'
		}).
		state('candidate-cv', {
			url: '/candidate-cv',
			templateUrl: 'modules/candidate-features/views/candidate-cv.client.view.html'
		});
	}
]);