'use strict';

<<<<<<< HEAD
angular.module('empoyer-jobs').controller('CompanyOpenJobsController', ['$scope', 'Authentication', 'Jobs', 'Employers', 'Companies', '$location', 'Socket',
    function($scope, Authentication, Jobs, Employers, Companies, $location, Socket) {
        $scope.user = Authentication.user;

        // If user is not signed in then redirect back home
        if (!$scope.user) $location.path('/signin');

        //		$scope.employer = $rootScope.employer;
        //		$scope.company = $rootScope.company;

        $scope.jobs = [];

        $scope.employer = Employers.get({
            employerId: $scope.user.employer
        }, function(employer) {
            $scope.company = Companies.get({
                companyId: employer.company
            }, function(company) {
                angular.forEach(company.jobs, function(job, key) {
                    Jobs.get({
                        jobId: job
                    }, function(job) {
                        $scope.jobs.push(job);
                    });
                });
            });
        });

        Socket.on('applied_on_job', function(data) {
            for (var d = 0, h = $scope.jobs.length; d < h; d++) {
                if ($scope.jobs[d]._id == data.job._id) {
                    $scope.jobs[d] = data.job;
                    break;
                }
            }


        });
    }
=======
angular.module('empoyer-jobs').controller('CompanyOpenJobsController', ['$scope', '$filter', 'Authentication', 'Jobs', 'Employers', 'Companies', '$location',
	function($scope, $filter, Authentication, Jobs, Employers, Companies, $location) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');

//		$scope.employer = $rootScope.employer;
//		$scope.company = $rootScope.company;
        $scope.jobs = [];

		$scope.employer = Employers.get({
				employerId: $scope.user.employer
			}, function(employer){
				$scope.company = Companies.get({
					companyId: employer.company
				}, function(company){
					angular.forEach(company.jobs, function(job, key){
						Jobs.get({
							jobId: job
						}, function(job){
							$scope.jobs.push(job);
						});
					});
				});
			});
	}
>>>>>>> d82155aabf49e8b2395b5419e1eb7c922b31c079
]);