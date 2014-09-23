'use strict';

angular.module('short-list').controller('ShortlistedCandidatesController', ['$scope', '$http', '$stateParams', '$modal',
	function($scope, $http, $stateParams, $modal) {
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

// 		 $scope.sms = {to: '{{shortlist.candidate.displayName}}' };
// 	    $scope.openSmsModal = function(sms) {
// 	      var modalInstance;
// 	      modalInstance = $modal.open({
// 	        templateUrl: '/modules/short-list/views/message-partials/sms.html',
// 	        controller: '',
// 	        resolve: {
// 	          sms: function() {
// 	            return angular.copy(sms);
// 	          }
// 	        }
// 	    	})
	    	  
// .controller('', [
//   '$scope', '$modalInstance', 'sms', function($scope, $modalInstance,sms) {

//     $scope.sms =sms ;

// 	$scope.ok = function (action) {
// 	$modalInstance.close({ action: action, sms: $scope.sms });
// 	};

// 	$scope.cancel = function () {
// 	$modalInstance.dismiss('cancel');

// 	};
//   }
// ]);
// }
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

					// send message
		$scope.sendmessage = function() {
	     
	     	var mesg = $modal.open({
	        templateUrl: '/modules/short-list/views/message/message.html',
	        controller: 'messageController',
	        // resolve: {
	        //   skill: function() {
	        //     return angular.copy(skill);
	        //   }
	        // }
	      });
	      mesg.result.then(function(result) 
	       {
	      //    $scope.sendmessage = result.sendmessage;
	       }, 
	      function() {

	      });
	    };


	}
]);
