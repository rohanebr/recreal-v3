'use strict';

angular.module('short-list').controller('messageController', [
  '$scope', '$modalInstance', '$http', function($scope, $modalInstance, $http) {

    
		 	$scope.ok = function (action) {
			$modalInstance.close();
			};

			$scope.cancel = function () {
			$modalInstance.dismiss('cancel');

			};	

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
