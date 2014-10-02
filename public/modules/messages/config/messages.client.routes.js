'use strict';

//Setting up route
angular.module('messages').config(['$stateProvider',
	function($stateProvider) {
		// Messages state routing
		$stateProvider.
		state('list-user-messages', {
			url: '/list-user-messages',
			templateUrl: 'modules/messages/views/list-user-messages.client.view.html'
		});
	}
]);