'use strict';

angular.module('candidate-signup-wizard').controller('CandidateWizardTwoController', ['$scope','$http','$state','Authentication','Candidates',
	function($scope,$http,$state,Authentication,Candidates) {
		// Controller Logic
		// ...

        $scope.candidate={};
        $scope.degree_titles = ['High School','Associate Degree','Bachelor Degree','Master Degree','Master of Business Administration (M.B.A.)',
                                'Juris Doctor (J.D.)','Doctor of Medicine (M.D.)','Doctor of Philosophy (Ph.D.)',
                                'Engineers Degree'];
        $scope.LoadInitialData = function() {
            $scope.authentication = Authentication;
            // Find existing Candidate
            $scope.candidate = Candidates.get({ 
                candidateId: $scope.authentication.user.candidate
            });
        };
        //**********Education***********
        // Add Education
        $scope.addEducation = function() {
            if ($scope.newEducation.degree_title != '') {
                $scope.candidate.educations.push($scope.newEducation);
                $scope.newEducation = {};
            }
        };
        //Remove Education
        $scope.removeEducation = function(index) {
          $scope.candidate.educations.splice(index, 1);
        };


        //**********Position***********
        // Add Position
        $scope.addPosition = function() {
            if ($scope.newPosition.company != '') {
                $scope.candidate.positions.push($scope.newPosition);
                $scope.newPosition = {
                    name: ''
                };
            }
        };
        //Remove Position
        $scope.removePosition = function(index) {
          $scope.candidate.positions.splice(index, 1);
        };


        //**********Position***********
        // Add Position
        $scope.addProject = function() {
            if ($scope.newProject.company != '') {
                $scope.candidate.projects.push($scope.newProject);
                $scope.newProject = {
                    name: ''
                };
            }
        };
        //Remove Position
        $scope.removeProject = function(index) {
          $scope.candidate.projects.splice(index, 1);
        };

        //**********Skills***********
        // Add Skills
        $scope.addSkill = function() {
            if ($scope.newSkill.title != '') {
                $scope.candidate.skills.push($scope.newSkill);
                $scope.newSkill = {
                    name: ''
                };
            }
        };
        //Remove Skills
        $scope.removeSkill = function(index) {
          $scope.candidate.skills.splice(index, 1);
        };


		$scope.SaveAndRedirect = function() {
            $scope.success = $scope.error = null;

            if($scope.candidate.stage=='Two')
                $scope.candidate.stage = 'Three';

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