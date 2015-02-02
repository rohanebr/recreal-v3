'use strict';

angular.module('empolyer-favorites').controller('EmployerFavoritesController', ['$scope', '$http', 'Authentication', 'Employers', '$stateParams', '$modal','$rootScope',
	function($scope, $http, Authentication, Employers, $stateParams, $modal,$rootScope) {
		// Controller Logic
		// ...
	$rootScope.selectedCandidates=[];
	$scope.user = Authentication.user;
	$scope.employer = Employers.get({ 
      employerId: $scope.user.employer
    });
$scope.formData = {userType:''};
		$http.get('employers/favoriteCandidates/' + $scope.user.employer).success(function(employer) {
			$scope.employer = employer;
			$scope.shortListedObjects = employer.favorites;
			
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
		$scope.removeCandidateFromFavorites = function(shortlist) {

			var attribute = {
				jobId: shortlist.job._id,
				candidateId: shortlist.candidate._id
			}

			$http.put('employers/removeFromFavorites/' + $scope.employer._id , attribute).success(function(response) {

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
