'use strict';

angular.module('candidate-signup-wizard').controller('CandidateWizardFourController', ['$scope','$http','$state',
	function($scope,$http,$state) {
		// Controller Logic
		// ...
		$scope.SaveAndRedirect = function() {
        $scope.success = $scope.error = null;
        $http.post('/savecandidatewizardfourdata', {
                data: 'this is from front end controller'
            }).success(function(response) {
                $state.go('candidate-wizard-five');
            }).error(function(response) {
                 $scope.error = response.message;
            });
        };
	}
]);