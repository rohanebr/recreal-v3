'use strict';

angular.module('candidate-signup-wizard').controller('CandidateWizardThreeController', ['$scope','$http','$state',
	function($scope,$http,$state) {
		// Controller Logic
		// ....

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
        $http.post('/savecandidatewizardthreedata', {
                data: 'this is from front end controller'
            }).success(function(response) {
                $state.go('candidate-wizard-four');
            }).error(function(response) {
                 $scope.error = response.message;
            });
        };
	}
]);