'use strict';

angular.module('empoyer-jobs').controller('EmployerJobCandidatesController', ['$scope', '$filter', 'Jobs', '$stateParams', '$http',
	function($scope, $filter, Jobs, $stateParams, $http) {

		$scope.locationFilters = [];
		$scope.salaryFilters = [];

		$http.get('jobs/candidates/' + $stateParams.jobId).success(function(job) {
			$scope.job = job;
			$scope.candidates = job.candidates;
			$scope.filteredCandidates = $scope.candidates;

			populateLocationFilters();
			populateSalaryFilters();
			populateSkillsFilters();

		});
		// $http.get('jobs/candidates/' + $stateParams.jobId).success(function(job) {
		// 	$scope.job = job;
		// 	$scope.candidates = job.candidates;
		// 	$scope.filteredCandidates = $scope.candidates;

			

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

		var populateSkillsFilters = function(){
			
			$scope.candidates = $filter('orderBy')($scope.candidates, 'skills');
			var filterValue = 'invalid_value';
			for (var i = 0 ; i < $scope.candidates.length ; i++ ){
				var candidate = $scope.candidates[i];
				for(var j=0; i< $scope.candidates[j].skills.length; j++){
				if(candidate.skills.title !== filterValue){
					filterValue = candidate.skills.title;
					$scope.skillsFilters.push({
						name: filterValue,
						count: 0,
						value: false
					});
				}
			}
				$scope.skillsFilters[$scope.skillsFilters.length - 1].count++;
			}
		};
}
]);