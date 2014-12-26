'use strict';

angular.module('candidate-signup-wizard').controller('CandidateWizardTwoController', ['$scope','$http','$state','Authentication','Candidates',
	function($scope,$http,$state,Authentication,Candidates) {
		// Controller Logic
		// ...

        $scope.candidate={};

        $scope.LoadInitialData = function() {
            $scope.authentication = Authentication;
            // Find existing Candidate
            $scope.candidate = Candidates.get({ 
                candidateId: $scope.authentication.user.candidate
            });
        };



		$scope.SaveAndRedirect = function() {
            $scope.success = $scope.error = null;



            var candidate = $scope.candidate ;

            candidate.$update(function() {
                 $state.go('candidate-wizard-three');
            }, function(errorResponse) {
                 $scope.error = response.message;
            });



            // $http.post('/savecandidatewizardonedata', {
            //         candidate: $scope.candidate
            //     }).success(function(response) {
            //         $state.go('candidate-wizard-three');
            //     }).error(function(response) {
            //          $scope.error = response.message;
            //     });
        };
	}
]);