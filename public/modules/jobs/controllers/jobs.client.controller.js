'use strict';

// Jobs controller
angular.module('jobs').controller('JobsController', ['$http', '$scope', '$stateParams', '$location', 'Authentication', 'Candidates', 'Jobs',
	function($http, $scope, $stateParams, $location, Authentication, Candidates, Jobs ) {
		$scope.authentication = Authentication;

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');



        //Add one to view if the job was seen by the candidate
     
		


		// Create new Job
		$scope.create = function() {
			// Create new Job object
			var job = new Jobs ({
				title: this.title
			});

			// Redirect after save
			job.$save(function(response) {
				$location.path('jobs/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Job
		$scope.remove = function( job ) {
			if ( job ) { job.$remove();

				for (var i in $scope.jobs ) {
					if ($scope.jobs [i] === job ) {
						$scope.jobs.splice(i, 1);
					}
				}
			} else {
				$scope.job.$remove(function() {
					$location.path('jobs');
				});
			}
		};

		// Update existing Job
		$scope.update = function() {
			var job = $scope.job ;

			job.$update(function() {
				$location.path('jobs/' + job._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Apply for a Job
		$scope.apply = function(job) {

			$http.put('jobs/apply/' + job._id , job).success(function(response) {

				//And redirect to the index page
				$location.path('jobs/' + job._id);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Find a list of Jobs
		$scope.find = function() {
			$scope.jobs = Jobs.query();
		};

		// Find existing Job
		$scope.findOne = function() {

			$scope.job = Jobs.get({ 
				jobId: $stateParams.jobId
			}, function(job){

                 $scope.candidate = Candidates.get({ 
					candidateId: $scope.user.candidate
				}, function(candidate){

					if($scope.user.userType === 'candidate' && $scope.candidate.jobs.indexOf($scope.job._id) > 1){
						$scope.isApplied = true;
					}
					 $http.put('jobs/onePlusView/' + $stateParams.jobId , {user:$scope.user}).success(function(response) {				
							 }).error(function(response) {
									$scope.error = response.message;
														 });

			});	

			},function(err){
                 
                  $http.get('scrappedjobs/'+$stateParams.jobId).success(function(response){

                  	 $scope.job = response;
                  	 console.log($scope.job);
                  }).error(function(response){});



			});
    

           
         
		};
	}
]);