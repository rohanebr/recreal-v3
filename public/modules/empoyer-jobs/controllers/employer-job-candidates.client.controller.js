'use strict';

angular.module('empoyer-jobs').controller('EmployerJobCandidatesController', ['$scope', '$filter', 'Jobs', '$stateParams', '$http',
    function($scope, $filter, Jobs, $stateParams, $http) {
        $scope.firstTimeFetching=true;
        $scope.locationFilters = [];
        $scope.salaryFilters = [];
        $scope.visaFilters = [];
        $scope.employeetypeFilters = [];
        $scope.employeestatusFilters = [];
        $scope.itemsPerPage = 2;
        $scope.currentPage = 0;
        $scope.skip = 0;
        $scope.filters = [];

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

        $scope.isShortListed = function(candidate) {

            var ans = false;
            angular.forEach($scope.job.shortListedCandidates, function(item) {
                if (item.candidate == candidate._id)
                    ans = true;
            });
            return ans;
        };

        $scope.findCandidates = function(skip,limit,filters, isPageChange) {

        	console.log('find candidates function');

            $http.put('jobs/getPaginatedCandidates/' + $stateParams.jobId, {
                skip: skip,
                limit: limit,
                filter: filters,
                isPageChange: isPageChange
            }).success(function(job) {
            	
                $scope.job = job.job;
                // $scope.locationFilters=job.filters.locationFilters;
                	
                if(job.filters.salaryFilters.length > 0)
                	$scope.salaryFilters = job.filters.salaryFilters;
	            if(job.filters.visaFilters.length > 0) 
	                $scope.visaFilters = job.filters.visaFilters;
	            if(job.filters.employeetypeFilters.length > 0)    
	                $scope.employeetypeFilters = job.filters.employeetypeFilters;
	            if(job.filters.employeestatusFilters.length > 0)    
	                $scope.employeestatusFilters = job.filters.employeestatusFilters;
                
                $scope.candidates = $scope.job.candidates;
                $scope.total = job.totalentries;
                $scope.candidates = job.candidates;

            });
        }


        // Add to Short List
        $scope.addCandidateToShortList = function(candidate) {

            var attribute = {
                jobId: $scope.job._id,
                candidateId: candidate._id
            }


            $http.put('jobs/addToShortList/' + $scope.job._id, attribute).success(function(response) {

                $scope.job.shortListedCandidates.push({
                    candidate: candidate._id
                });

            }).error(function(response) {
                $scope.error = response.message;
            });
        };


        // Remove from Short List
        $scope.removeCandidateFromShortList = function(candidate) {

            var attribute = {
                jobId: $scope.job._id,
                candidateId: candidate._id
            }

            $http.put('jobs/removeFromShortList/' + $scope.job._id, attribute).success(function(response) {

                angular.forEach($scope.job.shortListedCandidates, function(item) {
                    if (item.candidate == candidate._id)
                        $scope.job.shortListedCandidates.splice($scope.job.shortListedCandidates.indexOf(item), 1);
                });
                //And redirect to the index page

                $location.path('jobs/' + job._id);
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

         //Add all watchers here from simple pagination watcher to the filter watchers
         $scope.$watch("currentPage", function(newValue, oldValue) {
            $scope.skip = newValue * $scope.itemsPerPage;
            if($scope.skip == 0){ //   if first page
            	$scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, false);
            } else {
            	$scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, true);
            }
        });
         //Removes and adds filter for salary
         $scope.salaryFilterChanged =  function(){
          
            $scope.salaryFilters.forEach(function(entry) {
    				if(entry.value==true)
    			   	      addToFilters("salary_expectation",entry.name); 
    				 else
    				    removeFromFilters("salary_expectation",entry.name);
    			
 														});
            $scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters);







         };

         //Remove and adds filter for visa
  $scope.visaFilterChanged = function(){
          
            $scope.visaFilters.forEach(function(entry) {
    				if(entry.value==true)
    			   	      addToFilters("visa_status",entry.name); 
    				 else
    				    removeFromFilters("visa_status",entry.name);
    			
 														});
            $scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, false);







         };
 //Remove and adds filter for employeetypeFilters
    $scope.emptypeFilterChanged = function(){
         
            $scope.employeetypeFilters.forEach(function(entry) {
    				if(entry.value==true)
    			   	      addToFilters("employee_type",entry.name); 
    				 else
    				    removeFromFilters("employee_type",entry.name);
    			
 														});
            $scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, false);







         };

//Remove and adds filter for employeestatusFilters
   $scope.empStatusFilterChanged = function(){
            
            $scope.employeestatusFilters.forEach(function(entry) {
    				if(entry.value==true)
    			   	      addToFilters("employee_status",entry.name); 
    				 else
    				    removeFromFilters("employee_status",entry.name);
    			
 														});
            $scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, false);







         };







    //addToFilters
     var addToFilters=function(type,name)
     {
      var alreadyPresentInFilters=false;
     	 $scope.filters.forEach(function(entry){
                if(type==entry.type && name==entry.name)
                        {
                        	alreadyPresentInFilters=true;
                        }


         });
         if(!alreadyPresentInFilters)
          $scope.filters.push({type:type,name:name});

     


     }

     //removeFromFilters
      var removeFromFilters=function(type,name)
     {
           $scope.filters.forEach(function(entry){
                if(type==entry.type && name==entry.name)
                       $scope.filters.splice($scope.filters.indexOf(entry),1);
                        
          });
     }






    }
]);