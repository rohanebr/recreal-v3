'use strict';

angular.module('empoyer-jobs').controller('EmpJobPostTwoController', ['$scope',
	function($scope) {
	
		$scope.job={};

		$scope.SaveAndRedirect = function() {
			$scope.success = $scope.error = null;
			
			$http.post('/SaveEmpJobPostTwoData', $scope.job).success(function(response) {
				// If successful show success message and clear form
				
			}).error(function(response) {
				$scope.error = response.message;
			});
		};



		//**********Responsibilities***********
		// Add Responsibility
		$scope.addResponsibility = function() {
	      $scope.job.responsibilities.push({
	        name: ''
	      });
	    };
	    //Remove Responsibility
	    $scope.removeResponsibility = function(index) {
	      $scope.job.responsibilities.splice(index, 1);
	    };




	    //**********Qualification***********
		// Add Qualification
		$scope.addQualification = function() {
	      $scope.job.qualifications.push({
	        name: ''
	      });
	    };
	    //Remove Qualification
	    $scope.removeQualification = function(index) {
	      $scope.job.qualifications.splice(index, 1);
	    };





	    //**********Education***********
		// Add Education
		$scope.addEducation = function() {
	      $scope.job.educations.push({
	        title: ''
	      });
	    };
	    //Remove Education
	    $scope.removeEducation = function(index) {
	      $scope.job.educations.splice(index, 1);
	    };




	    //**********Skills***********
		// Add Skills
		$scope.addSkill = function() {
	      $scope.job.skills.push({
	        title: ''
	      });
	    };
	    //Remove Skills
	    $scope.removeSkill = function(index) {
	      $scope.job.skills.splice(index, 1);
	    };

	}
]);