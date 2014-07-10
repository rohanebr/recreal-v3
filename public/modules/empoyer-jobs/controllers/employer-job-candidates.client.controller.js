'use strict';

angular.module('empoyer-jobs').controller('EmployerJobCandidatesController', ['$scope', 'Jobs', '$stateParams', '$http',
	function($scope, Jobs, $stateParams, $http) {


		$http.get('jobs/candidates/' + $stateParams.jobId).success(function(job) {
				$scope.job = job;
				$scope.candidates = job.candidates;
			});
	}
]);