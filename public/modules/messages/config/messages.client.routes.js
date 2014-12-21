'use strict';

//Setting up route
angular.module('messages').config(['$stateProvider',
	function($stateProvider) {
		// Messages state routing
		$stateProvider.
		state('list-user-messages', {
			url: '/list-user-messages',
			templateUrl: 'modules/messages/views/list-user-messages.client.view.html'
		}).
		state('list-user-messages.inbox', {
			url: '/inbox',
			templateUrl: 'modules/messages/views/inbox.client.view.html'
			
		}).
		state('create-message',{
            url: '/create-message',
			templateUrl: 'modules/messages/views/create-message.client.view.html'


		});
	}
]);