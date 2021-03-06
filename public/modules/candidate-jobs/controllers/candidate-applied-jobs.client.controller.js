'use strict';

angular.module('candidate-jobs').controller('CandidateAppliedJobsController', ['$scope', 'Jobs', '$http', 'Authentication', 'Candidates', '$location',
	function($scope, Jobs, $http, Authentication, Candidates, $location) {

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');

		$scope.candidate = Candidates.get({ 
			candidateId: $scope.user.candidate
		});	

		
		$scope.jobs = Jobs.query();

		$scope.hasApplied = function(job){
			if ($scope.candidate.jobs.indexOf(job._id) > -1) {
			    return true;
			} else {
			   	return false;
			}
		};

				// Apply for a Job
		$scope.apply = function(job) {

			$http.put('jobs/apply/' + job._id , job).success(function(response) {

				$scope.candidate.jobs.push(job);
				$scope.jobs.splice($scope.jobs.indexOf(job), 1);
				$scope.$apply();
				//And redirect to the index page

				$location.path('jobs/' + job._id);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);