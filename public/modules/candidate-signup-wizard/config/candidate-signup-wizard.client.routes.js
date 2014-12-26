'use strict';

//Setting up route
angular.module('candidate-signup-wizard').config(['$stateProvider',
	function($stateProvider) {
		// Candidate signup wizard state routing
		$stateProvider.
		state('candidate-wizard-five', {
			url: '/candidate-wizard-five',
			templateUrl: 'modules/candidate-signup-wizard/views/candidate-wizard-five.client.view.html'
		}).
		state('candidate-wizard-four', {
			url: '/candidate-wizard-four',
			templateUrl: 'modules/candidate-signup-wizard/views/candidate-wizard-four.client.view.html'
		}).
		state('candidate-wizard-three', {
			url: '/candidate-wizard-three',
			templateUrl: 'modules/candidate-signup-wizard/views/candidate-wizard-three.client.view.html'
		}).
		state('candidate-wizard-two', {
			url: '/candidate-wizard-two',
			templateUrl: 'modules/candidate-signup-wizard/views/candidate-wizard-two.client.view.html'
		}).
		state('candidate-wizard-one', {
			url: '/candidate-wizard-one/:tokenId',
			templateUrl: 'modules/candidate-signup-wizard/views/candidate-wizard-one.client.view.html'
		});
	}
]);