'use strict';

angular.module('candidate-features').controller('CandidateCvController', ['$scope', 'Authentication', 'Candidates', '$location',
	function($scope, Authentication, Candidates, $location) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');

		$scope.candidate = Candidates.get({ 
			candidateId: $scope.user.candidate
		}, function(candidate){

			if(!candidate.skills){
				$scope.candidate.skills =  [{title: ''}];
			}

		});	

		// Update existing Candidate
		$scope.update = function() {
			var candidate = $scope.candidate ;

			candidate.$update(function() {
				$location.path('candidates/' + candidate._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	    $scope.addSkill = function() {
	      $scope.candidate.skills.push({
	        title: ''
	      });
	    };

	    $scope.removeSkill = function(index) {
	      $scope.candidate.skills.splice(index, 1);
	    };

	}
]);