'use strict';

angular.module('candidate-signup-wizard').controller('CandidateSignupController', ['$modalInstance','$location','$scope','$modal','$http',
	function($modalInstance,$location,$scope,$modal,$http) {
		// Candidate signup controller logic
		// ...
		$scope.credentials = {}; 
		$scope.signup = function() {			
			$scope.credentials.userType = "candidate";
			$http.post('/signupcandidate', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				if(response.status){
					$location.path('/signup-email-activation');
					 $modalInstance.dismiss();
				}

				//And redirect to the index page
				// $location.path('/');

			}).error(function(response) {
				$scope.error = response.message;
			});
		};

	}
]);