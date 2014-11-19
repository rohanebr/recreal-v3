'use strict';

angular.module('candidate-jobs').controller('CandidateOpenJobsController', ['$scope', 'Jobs', '$http', 'Authentication', 'Candidates', '$location','Socket','$rootScope',
	function($scope, Jobs, $http, Authentication, Candidates, $location,Socket,$rootScope) {
console.log( $rootScope.coords.lat+","+ $rootScope.coords.longi);
$scope.itemsPerPage = 10;
        $scope.currentPage = 0;
        $scope.isPageChange=false;
        $scope.skip = 0;
		$scope.user = Authentication.user;
 
		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');
$scope.range = function() {
            var rangeSize = 5;
            var ret = [];
            var start;

            start = $scope.currentPage;
            if (start > $scope.pageCount() - rangeSize) {
                start = $scope.pageCount() - rangeSize;
            }

            for (var i = start; i < start + rangeSize; i++) {
                if (i >= 0)
                    ret.push(i);
            }
            return ret;
        };


        $scope.prevPage = function() {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.prevPageDisabled = function() {
            return $scope.currentPage === 0 ? "disabled" : "";
        };

        $scope.nextPage = function() {
            if ($scope.currentPage < $scope.pageCount() - 1) {
                $scope.currentPage++;
            }
        };

        $scope.nextPageDisabled = function() {
            return $scope.currentPage === $scope.pageCount() - 1 ? "disabled" : "";
        };

        $scope.pageCount = function() {

            return Math.ceil($scope.total / $scope.itemsPerPage);

        };

        $scope.setPage = function(n) {

            if (n >= 0 && n < $scope.pageCount()) {

                $scope.currentPage = n;

            }
        };

		$scope.candidate = Candidates.get({ 
			candidateId: $scope.user.candidate
		});	
 		Socket.on('job_posted',function(data){
			console.log(data);
            $scope.jobs.push(data.job);
 console.log( $rootScope.coords.lat+","+ $rootScope.coords.longi);

		});
$scope.findJobs= function(skip,limit, isPageChange) {
	 $http.put('jobs/getPaginatedJobs/'+$scope.user._id, {
                skip: skip,
                limit: limit,
                isPageChange:isPageChange
            }).success(function(job) {
                   $scope.jobs=job;
                   $scope.total=job.length;   


            });
	


};



        $scope.$watch("currentPage", function(newValue, oldValue) {

            $scope.skip = newValue * $scope.itemsPerPage;
            if($scope.skip == 0){ //   if first page
            	$scope.findJobs($scope.skip,$scope.itemsPerPage, false);
            } else {
            	$scope.findJobs($scope.skip,$scope.itemsPerPage, true);
            }
        });
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