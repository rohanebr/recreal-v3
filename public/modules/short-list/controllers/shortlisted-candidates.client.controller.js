'use strict';

angular.module('short-list').controller('ShortlistedCandidatesController', ['$scope', '$http', '$stateParams', '$modal','$rootScope',
	function($scope, $http, $stateParams, $modal,$rootScope) {
		// Controller Logic
		// ...
	$rootScope.selectedCandidates=[];
$scope.formData = {userType:''};
		$http.get('jobs/shortListedCandidates/' + $stateParams.jobId).success(function(job) {
			$scope.job = job;
			$scope.shortListedObjects = job.shortListedCandidates;
			
		});

 $scope.$on("$destroy", function() {
 	for(var d=0,s=$scope.shortListedObjects.length;d<s;d++)
 	{
 	
 		var f=$scope.shortListedObjects[d]
 		console.log(f.selected);
          if(f.selected)
         { 
          $rootScope.selectedCandidates.push($scope.shortListedObjects[d].candidate._id);
          console.log("WTF");
      }

 	}
     
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
	        controller: 'MessagesController',
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
