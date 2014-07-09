'use strict';

angular.module('employer-company').controller('CompanyProfileController', ['$scope', 'Authentication', 'Employers', 'Companies', '$location',
	function($scope, Authentication, Employers, Companies, $location) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');

		// Find existing Employer
		// $scope.findOne = function() {
		// 	$scope.employer = Employers.get({ 
		// 		employerId: $scope.user.employer
		// 	}, function(employer){
		// 		$scope.company = Companies.get({
		// 			companyId: employer.company
		// 		});
		// 	});
		// };


		$scope.findOne = function(){
			$scope.employer = Employers.get({
				employerId: $scope.user.employer
			}, function(employer){
				$scope.company = Companies.get({
					companyId: employer.company
				});
			});
		};

		


		// Update existing Company
		$scope.update = function() {
			var company = $scope.company ;

			company.$update(function() {
				$location.path('companies/' + company._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);