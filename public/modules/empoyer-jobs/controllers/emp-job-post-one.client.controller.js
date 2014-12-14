'use strict';

angular.module('empoyer-jobs').controller('EmpJobPostOneController', ['$scope','$http', '$location','Jobs', '$stateParams',
	function($scope,$http,$location,Jobs, $stateParams) {
		// Controller Logic
		// ...
		// $scope.industries = Industries.getIndustries();

		$scope.job = {};
		$scope.job.industry = {};	

		//checks whether if this is going to create or update a job 
		$scope.initialize = function(){
			if(!$stateParams.jobId){    		// new job
				LoadDefaultData();
			}
			else{								//update old job
				findOne();
			}
		}

		var LoadDefaultData = function(){
			$scope.job.employee_type = "Contract";
			$scope.job.employee_status = "Full Time";
			$scope.job.shift = "Morning";
			$scope.job.no_of_positions = "1";
			$scope.job.travel_required = "No Travelling";
			$scope.job.visa_status = "Citizen";
			$scope.job.salary_range = "Less than $1000";
			// $scope.job.due_date = "2014-08-14";
			getIndustry();
		}

		var getIndustry = function(){	
			$http.get('/industries').success(function (response){
				$scope.industries = response;
				$scope.job.industry = $scope.industries[0];
				$scope.getIndustryJobRoles();
			});
		};

		$scope.getIndustryJobRoles = function(){
			$http.get('/industries/'+ $scope.job.industry.name).success(function (response){
				$scope.job_roles = response.job_roles;
				$scope.job.job_role = $scope.job_roles[0];
				$scope.job.title = $scope.job.job_role.name;

				

				
			});
		};

		// Find existing Job
		var findOne = function() {

			//get industries
			$http.get('/industries').success(function (response){
				$scope.industries = response;
				
				//get the job
				Jobs.get({ 
					jobId: $stateParams.jobId
				}, function(job){
					$scope.job = job;
                    $scope.job.due_date=new Date($scope.job.due_date);
					//get industry job_roles
					$http.get('/industries/'+ $scope.job.industry).success(function (response){
						$scope.job_roles = response.job_roles;
						// $scope.job.title = $scope.job.job_role.name;

						//set industry
						angular.forEach($scope.industries, function(industry){
							if(industry.name === $scope.job.industry){
								$scope.job.industry = industry;
							}
						});

						// set job_role
						angular.forEach($scope.job_roles, function(job_role){
							if(job_role._id == $scope.job.job_role){
								// never executes. even when the statement is true
								$scope.job.job_role = job_role;
							}
						});
					});
				});
			});
		};

					

		$scope.SaveAndRedirect = function() {
			$scope.success = $scope.error = null;

			$scope.job.industry = $scope.job.industry.name;
			$scope.job.job_role = $scope.job.job_role._id;

			if(!$stateParams.jobId){    		// new job
				$http.post('/SaveEmpJobPostOneData', $scope.job).success(function(response) {
					$location.path('emp-job-post-two/' + response._id);
				}).error(function(response) {
					$scope.error = response.message;
				});
			}
			else{								//update old job
				var job = $scope.job ;
				job.company = job.company._id;	// find job from backend returns populated company which produces error while saving
				job.$update(function() {
					$location.path('emp-job-post-two/' + job._id);
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			}
		};
	}
]);