'use strict';

angular.module('short-list').controller('ShortlistedCandidatesController', ['$scope', '$http', '$stateParams',
	function($scope, $http, $stateParams) {
		// Controller Logic
		// ...

		$http.get('jobs/shortListedCandidates/' + $stateParams.jobId).success(function(job) {
			$scope.job = job;
			$scope.shortListedObjects = job.shortListedCandidates;
			// $scope.filteredCandidates = $scope.candidates;


		});

		// // Remove from Short List
		// $scope.removeCandidateFromShortList = function(candidate) {

		// 		var attribute = {
		// 			jobId: $scope.job._id,
		// 			candidateId: candidate._id
		// 		}

		// 	$http.put('jobs/removeFromShortList/' + $scope.job._id , attribute).success(function(response) {
		// 		alert('responded');
				
		// 	}).error(function(response) {
		// 		$scope.error = response.message;
		// 	});
		// };

				// Remove from Short List
		$scope.removeCandidateFromShortList = function(candidate) {

				var attribute = {
					jobId: $scope.job._id,
					candidateId: candidate
				}

			$http.put('jobs/removeFromShortList/' + $scope.job._id , attribute).success(function(response) {

				//And redirect to the index page


				$location.path('jobs/' + job._id);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

	}
]);

