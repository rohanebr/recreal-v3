'use strict';

angular.module('candidate-signup-wizard').controller('CandidateWizardTwoController', ['$scope','$http','$state',
	function($scope,$http,$state) {
		// Controller Logic
		// ...
		$scope.SaveAndRedirect = function() {
        $scope.success = $scope.error = null;
        $http.post('/savecandidatewizardtwodata', {
                data: 'this is from front end controller'
            }).success(function(response) {
                $state.go('candidate-wizard-three');
            }).error(function(response) {
                 $scope.error = response.message;
            });
        };
	}
]);