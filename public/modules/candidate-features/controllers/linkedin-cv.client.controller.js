'use strict';

angular.module('candidate-features').controller('LinkedinCvController', ['$scope', '$http', 'Authentication','Candidates', 
	function($scope, $http, Authentication,Candidates) {
         $scope.update = function()
         {console.log($scope.candidate);
           var candidate=$scope.candidate;
         	candidate.$update(function() {
			   console.log("Candidate Updated");
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
         }
		$scope.getLinkiedInProfile = function(){
			
			$scope.user = Authentication.user;

			 $http.get('/users/linkedInProfile/' + $scope.user._id).success(function(res) {
             $scope.candidate = Candidates.get({ 
				candidateId: res._id
			});
			 	
                
                }).error(function(data, status, headers, confige) {

                    console.log("Shouldnt have happened");
                });



		};
	}
]);