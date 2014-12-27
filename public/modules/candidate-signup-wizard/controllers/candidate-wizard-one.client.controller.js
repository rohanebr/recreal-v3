'use strict';

angular.module('candidate-signup-wizard').controller('CandidateWizardOneController', ['$scope','$http','$state','$stateParams','Authentication','$modal',
	function($scope,$http,$state,$stateParams,Authentication,$modal) {
		// Controller Logic
		// ...
		$scope.candidate={};
        $scope.LoadInitialData = function() {
            if ($stateParams.tokenId) {
                $http.post('/validatetoken', {
                    token: $stateParams.tokenId
                }).success(function(response) {
                    $scope.user = response.user;
                    console.log(response.user);
                    console.log(response);
                    if ($scope.user.user == "nothing") {
                        
                        $state.go('home');
                    } else {
                        $scope.authentication = Authentication;
                        $scope.authentication.user = response.user;
                        $scope.candidate = response.candidate;
                        console.log(response.candidate);
                    }
                }).error(function(response) {
                    $scope.error = response.message;

                });
            } else {
                $state.go('home');
            }
        };



		$scope.SaveAndRedirect = function() {
            $scope.success = $scope.error = null;
            if($scope.candidate.stage=='One')
                $scope.candidate.stage = 'Two';
            $http.post('/savecandidatewizardonedata', {
                    candidate: $scope.candidate
                }).success(function(response) {
                    $state.go('candidate-wizard-two');
                }).error(function(response) {
                     $scope.error = response.message;
                });
        };

	}
]);