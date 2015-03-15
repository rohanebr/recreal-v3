'use strict';

angular.module('job-applications').factory('JobApplications', ['$http',
	function($http) {
		// Industries service logic
		// ...
		var factory = {};
		
		

		// Public API
		factory.changeStage = function(jobApplication, job, callback) {
			$http.put('jobs/changeApplicantStage/' + job._id, jobApplication).success(function(responseJobApplication) {              
                console.log('woohoo! "service - change stage" running...');
                callback(responseJobApplication);
            }).error(function(response) {
                // $scope.error = response.message;
            });
		};

		factory.addCandidateToFavorites = function(candidate, job, employer, callback){

			var attribute = {
                jobId: job._id,
                candidateId: candidate._id
            }

			$http.put('employers/addToFavorites/' + employer._id, attribute).success(function(response) {

               var jobApplication = {
                    candidate: candidate._id,
                    job: job._id
                };
                console.log('woohoo! "service - add to favorites" running...');
                callback(jobApplication);

            }).error(function(response) {
                $scope.error = response.message;
            });
		};


		return factory;
	}
]);