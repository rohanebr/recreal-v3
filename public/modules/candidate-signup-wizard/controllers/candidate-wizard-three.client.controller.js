'use strict';

angular.module('candidate-signup-wizard').controller('CandidateWizardThreeController', ['$scope','$http','$state','Authentication','Candidates',
	function($scope,$http,$state,Authentication,Candidates) {
		// Controller Logic
		// ....

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

            if($scope.candidate.stage=='Three')
                $scope.candidate.stage = 'Four';

            var candidate = $scope.candidate ;

            candidate.$update(function() {
                 $state.go('candidate-wizard-four');
            }, function(errorResponse) {
                 $scope.error = response.message;
            });
        };

        
	}
]);