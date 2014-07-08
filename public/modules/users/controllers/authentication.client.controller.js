'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication', '$state',
	function($scope, $http, $location, Authentication, $state) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				$scope.authentication.user = response;

				//And redirect to the index page
				$location.path('/');

			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		//be sure to inject $scope and $location
		var changeLocation = function(url, forceReload) {
		  $scope = $scope || angular.element(document).scope();
		  if(forceReload || $scope.$$phase) {
		    window.location = url;
		  }
		  else {
		    //only use this if you want to replace the history stack
		    //$location.path(url).replace();

		    //this this if you want to change the URL and add it to the history stack
		    $location.path(url);
		    $scope.$apply();
		  }
		};
		
		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				$scope.authentication.user = response;

				//And redirect to the index page
				// $location.path('/');
				changeLocation('/');

			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);