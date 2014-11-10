'use strict';

angular.module('candidate-features').controller('LinkedinCvController', ['$scope', '$http', 'Authentication', 
	function($scope, $http, Authentication) {

		$scope.getLinkiedInProfile = function(){
			
			$scope.user = Authentication.user;

			 $http.get('/users/linkedInProfile/' + $scope.user._id).success(function(res) {

			 	$scope.candidate = new Object();

			 	$scope.candidate.displayName = res.firstName + ' ' + res.lastName;
			 	$scope.candidate.title = res.headline;
			 	$scope.candidate.country = res.locat.name;
			 	$scope.candidate.picture_url = res.pictureUrl;
			 	$scope.candidate.objective = res.summary;

                }).error(function(data, status, headers, confige) {

                    console.log("Shouldnt have happened");
                });



		};
	}
]);