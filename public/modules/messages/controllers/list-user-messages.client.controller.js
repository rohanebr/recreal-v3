'use strict';

angular.module('messages').controller('ListUserMessagesController', ['$scope', 'Authentication', '$location',
	function($scope, Authentication, $location) {
		// Controller Logic
		// ...
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');

		
	}
]);