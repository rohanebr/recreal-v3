'use strict';

angular.module('empoyer-jobs').controller('EmployerJobCandidatesController', ['$scope', '$filter', 'Jobs', '$stateParams', '$http',
	function($scope, $filter, Jobs, $stateParams, $http) {

		$scope.locationFilters = [];
		$scope.salaryFilters = [];
		$scope.visaFilters = [];
		$scope.employeetypeFilters = [];
		$scope.employeestatusFilters = [];
		
		$http.get('jobs/candidates/' + $stateParams.jobId).success(function(job) {
			$scope.job = job;
			$scope.candidates = job.candidates;
			$scope.filteredCandidates = $scope.candidates;

			populateLocationFilters();
			populateSalaryFilters();
			populateVisaFilters();
			populateEmployeetypeFilters();
			populateEmployeestatusFilters();

		});
		// $http.get('jobs/candidates/' + $stateParams.jobId).success(function(job) {
		// 	$scope.job = job;
		// 	$scope.candidates = job.candidates;
		// 	$scope.filteredCandidates = $scope.candidates;

			
			// Add to Short List
		$scope.addCandidateToShortList = function(candidate) {

			var attribute = {
					jobId: $scope.job._id,
					candidateId: candidate._id
				}

			$http.put('jobs/addToShortList/' + $scope.job._id , attribute).success(function(response) {

				alert('server responded');
				// $scope.candidate.jobs.push(job);
				// $scope.jobs.splice($scope.jobs.indexOf(job), 1);
				// $scope.$apply();
				

				// $location.path('jobs/' + job._id);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};


		// Remove from Short List
		$scope.removeCandidateFromShortList = function(candidate) {

				var attribute = {
					jobId: $scope.job._id,
					candidateId: candidate._id
				}

			$http.put('jobs/removeFromShortList/' + $scope.job._id , attribute).success(function(response) {

				$scope.candidate.jobs.push(job);
				$scope.jobs.splice($scope.jobs.indexOf(job), 1);
				$scope.$apply();
				//And redirect to the index page

				$location.path('jobs/' + job._id);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// });
		// $scope.search.name = 'Rawalpindi';



		var populateLocationFilters = function(){
			
			$scope.candidates = $filter('orderBy')($scope.candidates, 'location');
			var filterValue = 'invalid_value';
			for (var i = 0 ; i < $scope.candidates.length ; i++ ){
				var candidate = $scope.candidates[i];
				if(candidate.location !== filterValue){
					filterValue = candidate.location;
					$scope.locationFilters.push({
						name: filterValue,
						count: 0,
						value: false
					});
				}
				$scope.locationFilters[$scope.locationFilters.length - 1].count++;
			}
		};

		var populateSalaryFilters = function(){
			
			$scope.candidates = $filter('orderBy')($scope.candidates, 'salary_expectation');
			var filterValue = 'invalid_value';
			for (var i = 0 ; i < $scope.candidates.length ; i++ ){
				var candidate = $scope.candidates[i];
				if(candidate.salary_expectation !== filterValue){
					filterValue = candidate.salary_expectation;
					$scope.salaryFilters.push({
						name: filterValue,
						count: 0,
						value: false
					});
				}
				$scope.salaryFilters[$scope.salaryFilters.length - 1].count++;
			}
		};

		var populateVisaFilters = function(){
			
			$scope.candidates = $filter('orderBy')($scope.candidates, 'visa_status');
			var filterValue = 'invalid_value';
			for (var i = 0 ; i < $scope.candidates.length ; i++ ){
				var candidate = $scope.candidates[i];
				if(candidate.visa_status !== filterValue){
					filterValue = candidate.visa_status;
					$scope.visaFilters.push({
						name: filterValue,
						count: 0,
						value: false
					});
				}
				$scope.visaFilters[$scope.visaFilters.length - 1].count++;
			}
		};

		var populateEmployeetypeFilters = function(){
			
			$scope.candidates = $filter('orderBy')($scope.candidates, 'visa_status');
			var filterValue = 'invalid_value';
			for (var i = 0 ; i < $scope.candidates.length ; i++ ){
				var candidate = $scope.candidates[i];
				if(candidate.visa_status !== filterValue){
					filterValue = candidate.visa_status;
					$scope.visaFilters.push({
						name: filterValue,
						count: 0,
						value: false
					});
				}
				$scope.employeetypeFilters[$scope.employeetypeFilters.length - 1].count++;
			}
		};

		var populateEmployeestatusFilters = function(){
			
			$scope.candidates = $filter('orderBy')($scope.candidates, 'employee_status');
			var filterValue = 'invalid_value';
			for (var i = 0 ; i < $scope.candidates.length ; i++ ){
				var candidate = $scope.candidates[i];
				if(candidate.employee_status !== filterValue){
					filterValue = candidate.employee_status;
					$scope.employeestatusFilters.push({
						name: filterValue,
						count: 0,
						value: false
					});
				}
				$scope.visaFilters[$scope.visaFilters.length - 1].count++;
			}
		};

		var populateEmployeetypeFilters = function(){
			
			$scope.candidates = $filter('orderBy')($scope.candidates, 'employee_type');
			var filterValue = 'invalid_value';
			for (var i = 0 ; i < $scope.candidates.length ; i++ ){
				var candidate = $scope.candidates[i];
				if(candidate.employee_type !== filterValue){
					filterValue = candidate.employee_type;
					$scope.employeetypeFilters.push({
						name: filterValue,
						count: 0,
						value: false
					});
				}
				$scope.employeetypeFilters[$scope.employeetypeFilters.length - 1].count++;
			}
		};

		var populateEmployeestatusFilters = function(){
			
			$scope.candidates = $filter('orderBy')($scope.candidates, 'employee_status');
			var filterValue = 'invalid_value';
			for (var i = 0 ; i < $scope.candidates.length ; i++ ){
				var candidate = $scope.candidates[i];
				if(candidate.employee_status !== filterValue){
					filterValue = candidate.employee_status;
					$scope.employeestatusFilters.push({
						name: filterValue,
						count: 0,
						value: false
					});
				}
				$scope.employeestatusFilters[$scope.employeestatusFilters.length - 1].count++;
			}
		};

}
]);

