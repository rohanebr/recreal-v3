'use strict';

angular.module('candidate-signup-wizard').controller('CandidateWizardFiveController', ['$scope','$http','$state',
	function($scope,$http,$state) {
		// Controller Logic
		// ...

        $scope.candidate={};
        $scope.LoadInitialData = function() {
            $scope.authentication = Authentication;
            $scope.authentication.user = response.user;
            $scope.candidate = response.candidate;
        };



		$scope.SaveAndRedirect = function() {
        $scope.success = $scope.error = null;
        $http.post('/savecandidatewizardfivedata', {
                data: 'this is from front end controller'
            }).success(function(response) {
                $state.go('candidate-wizard-one');
            }).error(function(response) {
                 $scope.error = response.message;
            });
        };
	}
]);