'use strict';

//Setting up route
angular.module('empolyer-favorites').config(['$stateProvider',
	function($stateProvider) {
		// Empolyer favorites state routing
		$stateProvider.
		state('employer-favorites', {
			url: '/employer-favorites',
			templateUrl: 'modules/empolyer-favorites/views/employer-favorites.client.view.html'
		});
	}
]);