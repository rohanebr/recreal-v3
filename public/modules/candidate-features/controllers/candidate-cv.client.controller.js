'use strict';

angular.module('candidate-features').controller('CandidateCvController', ['$scope', 'Authentication', 'Candidates', '$location', '$modal',
	function($scope, Authentication, Candidates, $location, $modal) {
		$scope.user = Authentication.user;
		$scope.isEditing = false;

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


	    $scope.newSkill = { title: '', experience: 1, level: 'Beginner' };
	    $scope.openSkillModal = function(skill) {
	      var modalInstance;
	      modalInstance = $modal.open({
	        templateUrl: '/modules/candidate-features/views/cv-partials/skill-partial.html',
	        controller: 'SkillModalCtrl',
	        resolve: {
	          skill: function() {
	            return angular.copy(skill);
	          }
	        }
	      });
	      modalInstance.result.then(function(result) {
	        var skill = result.skill;
	        if (result.action == 'delete') {
	        	angular.forEach($scope.candidate.skills, function(cSkill){
		          	if(cSkill._id === skill._id )
		          		$scope.candidate.skills.splice($scope.candidate.skills.indexOf(cSkill), 1);
		          });
		    } else {
		        skill.title = skill.title.trim();
		        if (skill._id !== undefined) {
		          angular.forEach($scope.candidate.skills, function(cSkill){
		          	if(cSkill._id === skill._id )
		          		cSkill.title = skill.title;
		          });
		        } else {
		          $scope.candidate.skills.push(skill);
		          $scope.newSkill = { title: '', experience: 1, level: 'Beginner' };
		        }
		    }
	      }, function() {
	        // $log.info('Modal dismissed at: ' + new Date());
	      });
	    };



	}
]).controller('SkillModalCtrl', [
  '$scope', '$modalInstance', 'skill', function($scope, $modalInstance, skill) {

    $scope.skill = skill;

	$scope.ok = function (action) {
	$modalInstance.close({ action: action, skill: $scope.skill });
	};

	$scope.cancel = function () {
	$modalInstance.dismiss('cancel');

	};
  }
]);