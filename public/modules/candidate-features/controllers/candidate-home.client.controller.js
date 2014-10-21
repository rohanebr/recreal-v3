'use strict';

angular.module('candidate-features').controller('CandidateHomeController', ['$scope', 'Jobs', '$http', 'Authentication', 'Candidates', '$location', 'Socket',
	function($scope, Jobs, $http, Authentication, Candidates, $location, Socket) {

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');
        console.log($scope.user.candidate);
		$scope.candidate = Candidates.get({ 
			candidateId: $scope.user.candidate
		});	

		
		$scope.jobs = Jobs.query();

		$scope.hasApplied = function(job){

			for(var d=0,x=$scope.candidate.jobs.length;d<x;d++)
			{
                if($scope.candidate.jobs[d]===job._id)
                	 return true;

			}
			return false;
			
		};

		// Apply for a Job
		$scope.apply = function(job) {

			$http.put('jobs/apply/' + job._id , job).success(function(response) {

				Socket.emit('applied_on_job', {job: job, candidate: $scope.candidate});

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