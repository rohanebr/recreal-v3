'use strict';
angular.module('employer-company').controller('EmployerProfileViewController', ['$scope', 'Countries', 'Authentication', 'Employers', '$location',
	function($scope,Countries, Authentication, Employers, $location) {
		$scope.user = Authentication.user;
		$scope.countries = Countries.getCountries();
		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');

		// Find existing Employer
		$scope.findOne = function() {
			$scope.employer = Employers.get({ 
				employerId: $scope.user.employer
			});
		};
	}
]);