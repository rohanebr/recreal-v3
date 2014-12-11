'use strict';

angular.module('empoyer-jobs').controller('EmpJobPostOneController', ['$scope','$http',
	function($scope,$http) {
		// Controller Logic
		// ...
		// $scope.industries = Industries.getIndustries();
		$scope.LoadInitialData = function(){
			$scope.job = {};
			$scope.job.industry = {};
			$scope.job.employee_type = "Contract";
			$scope.job.employee_status = "Full Time";
			$scope.job.shift = "Morning";
			$scope.job.no_of_positions = "1";
			$scope.job.travel_required = "No Travelling";
			$scope.job.visa_status = "Citizen";
			$scope.job.salary_range = "Less than $1000";
			// $scope.job.due_date = "2014-08-14";
			$scope.getIndustry();
		}

		$scope.getIndustry = function(){	
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


		$scope.SaveAndRedirect = function() {
			$scope.success = $scope.error = null;
			console.log("saveredirect");
			$http.post('/SaveEmpJobPostOneData', $scope.job).success(function(response) {
				// If successful show success message and clear form
				console.log(response);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

	}
]);