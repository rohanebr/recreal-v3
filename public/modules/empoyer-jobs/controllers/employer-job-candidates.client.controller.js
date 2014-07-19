'use strict';

angular.module('empoyer-jobs').controller('EmployerJobCandidatesController', ['$scope', '$filter', 'Jobs', '$stateParams', '$http',
	function($scope, $filter, Jobs, $stateParams, $http) {

		$scope.locationFilters = [];


		$http.get('jobs/candidates/' + $stateParams.jobId).success(function(job) {
			$scope.job = job;
			$scope.candidates = job.candidates;
			$scope.filteredCandidates = $scope.candidates;

			populateLocationFilters();




		});

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
						count: 0
					});
				}
				$scope.locationFilters[$scope.locationFilters.length - 1].count++;
			}
		};



       


}
]);