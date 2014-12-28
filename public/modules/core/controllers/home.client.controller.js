'use strict';


angular.module('core').controller('HomeController', ['$scope','$modal', 'Authentication', '$state', '$rootScope','Employers', 'Companies', 'Candidates', 'Socket','$location',
	function($scope,$modal, Authentication, $state, $rootScope, Employers, Companies, Candidates , Socket,$location) {
		// This provides Authentication context.


		$scope.OpenCandidateSignUpModal = function() {
	     
	     	var modalInstance = $modal.open({
	        templateUrl: '/modules/candidate-signup-wizard/views/partials/candidate-signup-partial.html',
	        controller: 'CandidateSignupController'
	      	});
			modalInstance.result.then(function(result) 
			{
				console.log(result);
			//    $scope.sendmessage = result.sendmessage;
			}, 
			function() {

			});
	    };


		$scope.authentication = Authentication;
		var user = $scope.authentication.user;
		console.log(user);
		if(!user)
			$state.go('home');
		else if(user.userType === 'employer')
		{
	        if($scope.authentication.user.stage=="Basic")
	 			$location.path("emp-wizard-one/"+$scope.authentication.user.activeToken);
	  		if($scope.authentication.user.stage=="CompanyLocation")
	  			$location.path("emp-wizard-two");
	  		if($scope.authentication.user.stage=="NoJobs")
	  		{
		  		$scope.employer = Employers.get({
		        	employerId: $scope.authentication.user.employer
		    	}, function(employer) {
			        console.log(employer);
			        if (employer.jobs.length > 0) { // edit first job
			            $location.path('emp-job-post-two/' + employer.jobs[0]);
			        } else { // create new job
			            $location.path('emp-job-post-one');
			        	}
		    	});
	  		}
	  		if($scope.authentication.user.stage=="Active")
	  		{
	  			$rootScope.employer = Employers.get({
					employerId: $scope.authentication.user.employer
					}, function(employer){
					$rootScope.company = Companies.get({
						companyId: employer.company
					});
				});
				$state.go('employerDashboard');
	  		}
		}
		else if(user.userType === 'candidate'){ 
        		 $rootScope.candidate = Candidates.get({
					candidateId: $scope.authentication.user.candidate
				}, function(candidate){
					switch(candidate.stage)
					{
						case 'One':
							$location.path("candidate-wizard-one/"+$scope.authentication.user.activeToken);
						break;
						case 'Two':
							$state.go('candidate-wizard-two');
						break;
						case 'Three':
							$state.go('candidate-wizard-three');
						break;
						case 'Four':
							$state.go('candidate-wizard-four');
						break;
						case 'Five':
							$state.go('candidate-wizard-five');
						break;
						case 'Complete':
							$state.go('candidate-home');
						break;
					}
				});
		}
		else if(user.userType === 'transition'){
			$state.go('transition');
		}
	}
]);