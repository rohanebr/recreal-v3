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
	        controller: 'sendController',
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
]).controller('sendController', [
  '$scope', '$modalInstance', function($scope, $mesg) {

    // var convert = function convertDataURIToBlob(dataURI, mimetype) {
		  // var BASE64_MARKER = ';base64,';
		  // var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
		  // var base64 = dataURI.substring(base64Index);
		  // var raw = window.atob(base64);
		  // var rawLength = raw.length;
		  // var uInt8Array = new Uint8Array(rawLength);

		  // for (var i = 0; i < rawLength; ++i) {
		  //   uInt8Array[i] = raw.charCodeAt(i);
		  // }

		  // var bb = new Blob([uInt8Array.buffer], {type : mimetype});
		  

		  // return bb;\
		 	$scope.ok = function (action) {
			$mesg.close();
			};

			$scope.cancel = function () {
			$mesg.dismiss('cancel');

			};	
		}


  
]);

