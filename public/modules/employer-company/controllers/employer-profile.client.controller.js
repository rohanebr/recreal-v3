'use strict';

angular.module('employer-company').controller('EmployerProfileController', ['$scope', 'Authentication', 'Employers', '$location',
	function($scope, Authentication, Employers, $location) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');

		// Find existing Employer
		$scope.findOne = function() {
			$scope.employer = Employers.get({ 
				employerId: $scope.user.employer
			});
		};


		// Update existing Employer
		$scope.update = function() {
			var employer = $scope.employer ;

			employer.$update(function() {
				$location.path('employers/' + employer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


	}
]);