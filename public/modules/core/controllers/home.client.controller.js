'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$state', '$rootScope','Employers', 'Companies', 'Candidates', 'Socket','$location',
	function($scope, Authentication, $state, $rootScope, Employers, Companies, Candidates , Socket,$location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		var user = $scope.authentication.user;
		console.log(user);

  	
      
		if(!user)
			$state.go('home');
		else if(user.userType === 'employer'){
			
        if($scope.authentication.user.stage=="DeActive")
 	$location.path("emp-wizard-one/"+$scope.authentication.user.activeToken);
  if($scope.authentication.user.stage=="Basic")
  	$location.path("emp-wizard-two");
  if($scope.authentication.user.stage=="CompanyLocation"){
	  	$scope.employer = Employers.get({
	        employerId: $scope.authentication.user.employer
	    }, function(employer) {
	        console.log(employer);
	        if (employer.jobs.length > 0) { // edit first job
	            $location.path('emp-job-post-one-edit/' + employer.jobs[0]);
	        } else { // create new job
	            $location.path('emp-job-post-one');
	        }
	    });
  }
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