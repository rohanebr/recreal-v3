'use strict';

angular.module('candidate-features').controller('CandidateCvController', ['$scope', 'Authentication', 'Candidates', '$location',
	function($scope, Authentication, Candidates, $location) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');

		$scope.candidate = Candidates.get({ 
			candidateId: $scope.user.candidate
		}, function(candidate){

			if(!candidate.skills){
				$scope.candidate.skills =  [{title: ''}];
			}

			if(!candidate.educations){
				$scope.candidate.educations =  [{degree: ''}];
			}

		});	

		// Update existing Candidate
		$scope.update = function() {
			var candidate = $scope.candidate ;

			candidate.$update(function() {
				$location.path('candidates/' + candidate._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		//Skills
	    $scope.addSkill = function() {
	      $scope.candidate.skills.push({
	        title: ''
	      });
	    };

	    $scope.removeSkill = function(index) {
	      $scope.candidate.skills.splice(index, 1);
	    };

	    //Education
	     $scope.addEducation = function() {
	      $scope.candidate.educations.push({
	        title: ''
	      });
	    };

	    $scope.removeEducation = function(index) {
	      $scope.candidate.educations.splice(index, 1);
	    };

	    //Experience
	     $scope.addExperience = function() {
	      $scope.candidate.positions.push({
	        title: ''
	      });
	    };

	    $scope.removeExperience = function(index) {
	      $scope.candidate.positions.splice(index, 1);
	    };

	    //Projects
	     $scope.addProject = function() {
	      $scope.candidate.projects.push({
	        title: ''
	      });
	    };

	    $scope.removeProject = function(index) {
	      $scope.candidate.projects.splice(index, 1);
	    };

	    //Languages
	     $scope.addLanguage = function() {
	      $scope.candidate.languages.push({
	        title: ''
	      });
	    };

	    $scope.removeLanguage = function(index) {
	      $scope.candidate.languages.splice(index, 1);
	    };



	}
]);