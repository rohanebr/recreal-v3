'use strict';

angular.module('employer-company').controller('CompanyProfileController', ['$scope','Industries', 'Authentication', 'Employers', 'Companies', '$location',
	function($scope, Industries, Authentication, Employers, Companies, $location) {
		$scope.user = Authentication.user;
		$scope.industries = Industries.getIndustries();
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

		
		//Speciality
	    $scope.addSpeciality = function() {
	      $scope.company.specialties.push({
	        name: ''
	      });
	    };

	    $scope.removeSpeciality = function(index) {
	      $scope.company.specialties.splice(index, 1);
	    };

		// Update existing Company
		$scope.update = function() {
			var company = $scope.company ;

			company.$update(function() {
				$location.path('company-profile-view');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);