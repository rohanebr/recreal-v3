'use strict';

angular.module('empoyer-jobs').controller('EmployerJobCandidatesController', ['$scope', '$filter', 'Jobs', '$stateParams', '$http', '$modal',
    function($scope, $filter, Jobs, $stateParams, $http, $modal) {
        $scope.firstTimeFetching=true;
        $scope.locationFilters = [];
        $scope.salary_expectationFilters = [];
        $scope.visa_statusFilters = [];
        $scope.employee_typeFilters = [];
        $scope.employee_statusFilters = [];
        $scope.itemsPerPage = 2;
        $scope.currentPage = 0;
        $scope.skip = 0;
        $scope.priority=1;
        $scope.filters = [];
        $scope.filterLimit = 2;

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
            	 $scope.salary_expectationFilters = [];
        $scope.visa_statusFilters = [];
        $scope.employee_typeFilters = [];
        $scope.employee_statusFilters = [];
                $scope.job = job.job;
                // $scope.locationFilters=job.filters.locationFilters;
                	 $scope.total = job.totalentries;
                $scope.candidates = job.candidates;
                job.filters.forEach(function(entry){
                    if(entry.type=="salary_expectation")
                      $scope.salary_expectationFilters.push(entry);
                      if(entry.type=="visa_status")
                      $scope.visa_statusFilters.push(entry);

                if(entry.type=="employee_type")
                                    $scope.employee_typeFilters.push(entry);

                if(entry.type=="employee_status")
                                    $scope.employee_statusFilters.push(entry);



                });
                         
                
                if($scope.firstTimeFetching)
                {
                    $scope.salary_expectationFilters.forEach(function(entry){
                           $scope.salary_expectationFilters[$scope.salary_expectationFilters.indexOf(entry)].value=false;

                    });
                    $scope.visa_statusFilters.forEach(function(entry){
                           $scope.visa_statusFilters[$scope.visa_statusFilters.indexOf(entry)].value=false;

                    });
                    $scope.employee_statusFilters.forEach(function(entry){
                           $scope.employee_statusFilters[$scope.employee_statusFilters.indexOf(entry)].value=false;

                    });
                    $scope.employee_typeFilters.forEach(function(entry){
                           $scope.employee_typeFilters[$scope.employee_typeFilters.indexOf(entry)].value=false;

                    });
                    $scope.firstTimeFetching=false;

                }
               
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
         $scope.salary_expectationFilterChanged =  function(name){
          
            $scope.salary_expectationFilters.forEach(function(entry) {
                  if(name==entry.name)
                entry.value=!entry.value;
        
    				if(entry.value==true)
    			   	      $scope.addToFilters("salary_expectation",entry.name); 
    				 else
    				    $scope.removeFromFilters("salary_expectation",entry.name);
    			
 														});
           $scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters);

         };

         //Remove and adds filter for visa
  $scope.visa_statusFilterChanged = function(name){
          
            $scope.visa_statusFilters.forEach(function(entry) {
                  if(name==entry.name)
                entry.value=!entry.value;
        
    				if(entry.value==true)
    			   	     $scope.addToFilters("visa_status",entry.name); 
    				 else
    				    $scope.removeFromFilters("visa_status",entry.name);
    			
 														});
       $scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, false);







         };
 //Remove and adds filter for employee_typeFilters
    $scope.employee_typeFilterChanged = function(name){
         
            $scope.employee_typeFilters.forEach(function(entry) {
                if(name==entry.name)
                entry.value=!entry.value;
        
    				if(entry.value==true)
    			   	      $scope.addToFilters("employee_type",entry.name); 
    				 else
    				$scope.removeFromFilters("employee_type",entry.name);
    			
 														});
          $scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, false);







         };

//Remove and adds filter for employee_statusFilters
   $scope.employee_statusFilterChanged = function(name){
            
            $scope.employee_statusFilters.forEach(function(entry) {
                  if(name==entry.name)
                entry.value=!entry.value;
        
    				if(entry.value==true)
    			   	      $scope.addToFilters("employee_status",entry.name); 
    				 else
    				    $scope.removeFromFilters("employee_status",entry.name);
    			
 														});
           



$scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, false);


         };







    //addToFilters
    $scope.addToFilters=function(type,name)
     {
      var alreadyPresentInFilters=false;
     	 $scope.filters.forEach(function(entry){
          if(type==entry.type && name==entry.name)
                  {
                  	alreadyPresentInFilters=true;
                  }
         });

         if(!alreadyPresentInFilters){

          var typeExists = false;
          $scope.filters.forEach(function(entry){
            if(type==entry.type){
              typeExists = true;
              $scope.filters.push({type:type,name:name, priority: entry.priority});
            }
         });

          if(!typeExists){
             // There's no real number bigger than plus Infinity
              
              var highest = 0;
              var tmp;
              for (var i=$scope.filters.length-1; i>=0; i--) {
                  tmp = $scope.filters[i].priority;
                  if (tmp > highest) highest = tmp;
              }

              $scope.filters.push({type:type,name:name, priority: highest + 1});

          }

            //salary_expext salay_exp  visa visa
         }



          

     

    

     }

     //removeFromFilters
      $scope.removeFromFilters=function(type,name)
     {
      
           $scope.filters.forEach(function(entry){
                if(type==entry.type && name==entry.name)
                
                                      $scope.filters.splice($scope.filters.indexOf(entry),1);

                
                        
          });
            $scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, false);

     }
  $scope.openFilterModal = function (filterArray, name) {

    var modalInstance = $modal.open({
      templateUrl: '/modules/empoyer-jobs/views/employer-job-candidates/filter-modal.html',
      controller: 'FilterModalCtrl',
      resolve: {
        filter: function () {
          return {values: angular.copy(filterArray),
                  name: name};
        }
      }
    });

    modalInstance.result.then(function (filterObject) {
      var filternames=[];
      filterObject.filters.forEach(function(filter){
        if(filter.value)
        {
          filternames.push(filter.name);
        }
      });


      if(filterObject.name){
          filternames.forEach(function(filter){
              $scope.addToFilters(filterObject.name,filter);
          });
      }
      
     $scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, false);
     
    }, function () {
       
    });
  };



    }


]).

controller('FilterModalCtrl', [
     '$scope', '$modalInstance', 'filter', function($scope, $modalInstance, filter) {

       $scope.filters = filter.values;
       $scope.name = filter.name;

    $scope.ok = function () {
      // $scope.$parent.findCandidates($scope.$parent.skip, $scope.$parent.itemsPerPage, $scope.$parent.filters, false);
      $modalInstance.close({name:$scope.name,filters:$scope.filters});
    };

    $scope.cancel = function () {
    $modalInstance.dismiss('cancel');

    };
     }
   ]);