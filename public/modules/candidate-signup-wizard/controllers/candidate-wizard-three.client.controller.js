'use strict';

angular.module('candidate-signup-wizard').controller('CandidateWizardThreeController', ['$scope','$http','$state','Authentication','Candidates',
	function($scope,$http,$state,Authentication,Candidates) {
		// Controller Logic
		// ....

        $scope.candidate={};
        $scope.questions = [{title: 'Write about yourself'},
                            {title: 'Describe your strengths'},
                            {title: 'Describe your weekness'}];
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

            if(!candidate.questions)
                candidate.questions = [];
            angular.forEach($scope.questions, function(question){
                if($scope.questions && $scope.question != ''){
                    candidate.interview_questions.push(question);
                }
            });

            
            candidate.$update(function() {
                 $state.go('candidate-wizard-four');
            }, function(errorResponse) {
                 $scope.error = response.message;
            });
        };

        
	}
]);