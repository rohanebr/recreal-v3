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
		$scope.openMessageModal = function(reciever) {
	     
	     	var mesg = $modal.open({
	        templateUrl: '/modules/short-list/views/message/message.html',
	        controller: 'messageController',
	        resolve:{
	        	reciever: function () {
			        return reciever;
			    }	
	        } 
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
