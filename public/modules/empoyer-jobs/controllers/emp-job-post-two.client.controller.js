'use strict';

angular.module('empoyer-jobs').controller('EmpJobPostTwoController', ['$scope','$http', 'Jobs', '$stateParams', '$location',
	function($scope,$http, Jobs, $stateParams, $location) {
	
		$scope.job={};
		$scope.job.responsibilities = [];
		$scope.job.qualifications = [];
		$scope.newResponsibility = {
            name: ''
        };
        $scope.newSkill = {
            title: ''
        };
        $scope.priorities = ['Must','Important','Nice to have'];
        $scope.degree_titles = ['High School','Associate Degree','Bachelor Degree','Master Degree','Master of Business Administration (M.B.A.)',
        						'Juris Doctor (J.D.)','Doctor of Medicine (M.D.)','Doctor of Philosophy (Ph.D.)',
        						'Engineers Degree'];
        $scope.newQualification = {
            name: ''
        };
        //Find Job
        $scope.findOne = function() {
      		$scope.job = Jobs.get({ 
					jobId: $stateParams.jobId
				});
		};

        // $scope.job.responsibilities.push({
        //                     name: 'Product Development'
        //                 });



        
		//**********Responsibilities***********
		// Add Responsibility
		$scope.addResponsibility = function() {
	      if ($scope.newResponsibility.name != '') {
                $scope.job.responsibilities.push($scope.newResponsibility);
                $scope.newResponsibility = {
                    name: ''
                };
            }
	    };
	    //Remove Responsibility
	    $scope.removeResponsibility = function(index) {
	      $scope.job.responsibilities.splice(index, 1);
	    };

	    //**********Qualification***********
		// Add Qualification
		$scope.addQualification = function() {
	     if ($scope.newQualification.name != '') {
                $scope.job.qualifications.push($scope.newQualification);
                $scope.newQualification = {
                    name: ''
                };
            }
	    };
	    //Remove Qualification
	    $scope.removeQualification = function(index) {
	      $scope.job.qualifications.splice(index, 1);
	    };

	    //**********Education***********
		// Add Education
		$scope.addEducation = function() {
	    	if ($scope.newEducation.degree_title != '') {
                $scope.job.educations.push($scope.newEducation);
                $scope.newEducation = {
                    name: ''
                };
            }
	    };
	    //Remove Education
	    $scope.removeEducation = function(index) {
	      $scope.job.educations.splice(index, 1);
	    };

	    //**********Skills***********
		// Add Skills
		$scope.addSkill = function() {
	     	if ($scope.newSkill.title != '') {
                $scope.job.skills.push($scope.newSkill);
                $scope.newSkill = {
                    title: ''
                };
            }
	    };
	    //Remove Skills
	    $scope.removeSkill = function(index) {
	      $scope.job.skills.splice(index, 1);
	    };

	    //Save and Redirect
	    $scope.SaveAndRedirect = function() {
			$scope.success = $scope.error = null;
			
			$http.post('/SaveEmpJobPostOneData', $scope.job).success(function(response) {
				// If successful show success message and clear form
				
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		//Dont save and go back
		$scope.GoBack = function(){
			$location.path('emp-job-post-one-edit/' + $stateParams.jobId);
		}

	}
]);