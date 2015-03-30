'use strict';

angular.module('candidate-features').controller('LinkedinCvController', ['$scope', '$http', 'Authentication', 
	function($scope, $http, Authentication) {

		$scope.getLinkiedInProfile = function(){
			
			$scope.user = Authentication.user;

			 $http.get('/users/linkedInProfile/' + $scope.user._id).success(function(res) {
             
			 	$scope.candidate = new Object();

			 	$scope.candidate.displayName = res.displayName;
			 	$scope.candidate.title = res.title;
			 	$scope.candidate.country = res.country;
			 	$scope.candidate.picture_url = res.pictureUrl;
			 	$scope.candidate.skills=res.skills;
			 	$scope.candidate.objective = res.objective;
 				$scope.candidate.educations=res.educations;
 				$scope.candidate.positions=res.positions;
 				$scope.candidate.languages=res.languages;
                }).error(function(data, status, headers, confige) {

                    console.log("Shouldnt have happened");
                });



		};
	}
]);