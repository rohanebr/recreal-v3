'use strict';

angular.module('short-list').controller('ShortlistedCandidatesController', ['$scope', '$http', '$stateParams',
	function($scope, $http, $stateParams) {
		// Controller Logic
		// ...

		$http.get('jobs/shortListedCandidates/' + $stateParams.jobId).success(function(job) {
			$scope.job = job;
			$scope.candidates = job.shortListedCandidates;
			$scope.filteredCandidates = $scope.candidates;


		});
	}
]);

