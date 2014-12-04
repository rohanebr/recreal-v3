'use strict';

angular.module('employer-signup-wizard').controller('EmpSignupController', ['$modalInstance','$scope','$modal', '$location', '$http',
	function($modalInstance,$scope,$modal, $location, $http) {
		// Controller Logic
		// ...
		$scope.signup = function() {

			$scope.credentials.userType = "employer";
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				if(response.status){
					$location.path('/signup-email-activation');
					// $modalInstance.dismiss();
				}
				//And redirect to the index page
				// $location.path('/');

			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);