'use strict';
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


]);