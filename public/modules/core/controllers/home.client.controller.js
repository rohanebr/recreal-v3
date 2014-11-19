'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$state', '$rootScope','Employers', 'Companies', 'Candidates', 'Socket',
	function($scope, Authentication, $state, $rootScope, Employers, Companies, Candidates , Socket) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		var user = $scope.authentication.user;
		console.log(user);

        
      
		if(!user)
			$state.go('home');
		else if(user.userType === 'employer'){
			console.log("EMPLOYER");
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
		     
        		    
                  
        		 $rootScope.candidate = Candidates.get({
					candidate: $scope.authentication.user.candidate
				});
        	
			$state.go('candidate-home');
		}
		else if(user.userType === 'transition'){
			$state.go('transition');
		}
	}
]);