'use strict';

angular.module('empoyer-jobs').controller('EmpJobPostOneController', ['$scope','$http',
	function($scope,$http) {
		// Controller Logic
		// ...
		// $scope.industries = Industries.getIndustries();

		$http.get('/industries/'+ $scope.job.industry.name).success(function (response){
		$scope.industries = response.industries;
		$scope.industry = $scope.industries[0].name;
		getIndustryJobRoles();
		});
		$scope.getIndustryJobRoles = function(){
			$http.get('/industries/'+ $scope.job.industry.name).success(function (response){
				$scope.job_roles = response.job_roles;
				$scope.job_role = $scope.job_roles[0].name;
			});
		};


		$scope.SaveAndRedirect = function() {
			$scope.success = $scope.error = null;
			
			$http.post('/SaveEmpJobPostOneData', $scope.job).success(function(response) {
				// If successful show success message and clear form
				
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

	}
]);