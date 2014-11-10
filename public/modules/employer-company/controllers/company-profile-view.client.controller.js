'use strict';
	angular.module('employer-company').controller('CompanyProfileViewController', ['$scope','Industries', 'Authentication', 'Employers', 'Companies', '$location',
	function($scope, Industries, Authentication, Employers, Companies, $location) {
		$scope.user = Authentication.user;
		$scope.industries = Industries.getIndustries();
		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');

		$scope.findOne = function(){
			$scope.employer = Employers.get({
				employerId: $scope.user.employer
			}, function(employer){
				$scope.company = Companies.get({
					companyId: employer.company
				});
			});
		};
	}
]);
	


	