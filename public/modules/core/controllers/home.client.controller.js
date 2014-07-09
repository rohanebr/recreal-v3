'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$state', '$rootScope','Employers', 'Companies', 'Candidates',
	function($scope, Authentication, $state, $rootScope, Employers, Companies, Candidates) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		var user = $scope.authentication.user;


		if(!user)
			$state.go('home');
		else if(user.userType === 'employer'){
			$rootScope.employer = Employers.get({
				employerId: $scope.authentication.user.employer
			}, function(employer){
				$rootScope.company = Companies.get({
					companyId: employer.company
				});
			});
			$state.go('employerDashboard');
		}
		else if(user.userType === 'candidate'){
			$scope.candidate = Candidates.get({
					candidate: $scope.authentication.user.candidate
				});
			$state.go('candidate-home');
		}
	}
]);