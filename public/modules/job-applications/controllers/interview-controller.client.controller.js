'use strict';

angular.module('job-applications').controller('InterviewController', ['$scope', '$modalInstance','items','job','JobApplications',
    function($scope, $modalInstance,items,job,JobApplications) {
 console.log(job);
        $scope.onTimeSet = function(newDate, oldDate) {
        	 var a = moment(newDate);
            $scope.when = a.valueOf();
            console.log(a);
            console.log($scope.when);
            JobApplications.addInterviewDate(items,job,$scope.when, function(responseJobApplication){
              jobApplication.stage = responseJobApplication.stage;

            });
         $modalInstance.dismiss('cancel');
        }

}]);



