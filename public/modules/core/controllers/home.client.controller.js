'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$state',
	function($scope, Authentication, $state) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		var user = $scope.authentication.user;
		if(!user)
			$state.go('home');
		else if(user.userType === 'employer')
			$state.go('employerDashboard');
		else if(user.userType === 'candidate')
			$state.go('candidate-home');
	}
]);