'use strict';

angular.module('short-list').controller('ShortlistedCandidatesController', ['$scope',
	function($scope) {
		// Controller Logic
		// ...

		$http.get('/jobs/candidates/:jobId' + $stateParams.jobId).success(function(job) {
			$scope.job = job;
			$scope.candidates = job.candidates;
			$scope.filteredCandidates = $scope.candidates;

			alert('page loaded');
			alert($scope.candidates);

		});
	}
]);