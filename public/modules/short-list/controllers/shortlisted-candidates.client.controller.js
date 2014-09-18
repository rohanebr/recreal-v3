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

//  $scope.newSms = { candidate:shortlist.candidate, subject: '', message:''};
//     $scope.openSmsModal = function(sms) {
//       var modalInstance;
// 	     modalInstance = $modal.open({
// 	        templateUrl: '/modules/short-list/views/message-partials/sms.html',
// 	        controller: 'ShortlistedCandidatesController',
// 	     resolve: {
// 	          thread: function() {
// 	            return angular.copy(thread);
// 	          }
// 	        }
// 	      });
// .controller('ShortlistedCandidatesController', [
//   '$scope', '$modalInstance', 'thread', function($scope, $modalInstance, thread) {

//     $scope.thread = thread;

// 	$scope.ok = function (action) {
// 	$modalInstance.close({ action: action, thread: $scope.thread });
// 	};

// 	$scope.cancel = function () {
// 	$modalInstance.dismiss('cancel');

// 	};
//   }
// ]);

 // Remove from Short List
		$scope.removeCandidateFromShortList = function(candidate) {

				var attribute = {
					jobId: $scope.job._id,
					candidateId: candidate._id
				}

			$http.put('jobs/removeFromShortList/' + $scope.job._id , attribute).success(function(response) {

				//And redirect to the index page


				// $location.path('jobs/' + job._id);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

	}
]);

