'use strict';

angular.module('candidate-jobs').controller('CandidateOpenJobsController', ['ngMap','$scope', 'Jobs', '$http', 'Authentication', 'Candidates', '$location', 'Socket', '$rootScope',
    function(ngMap,$scope, Jobs, $http, Authentication, Candidates, $location, Socket, $rootScope) 
    {
        console.log($rootScope.coords.lat + "," + $rootScope.coords.longi);
        $scope.itemsPerPage = 10;
        $scope.currentPage = 0;
        $scope.locationFilters = [];
        $scope.isPageChange = false;
        $scope.skip = 0;
         $scope.completefilternames=[];
        $scope.firsttime = true;
        $scope.jobs = [];
         $scope.dummyfilters=[];
        $scope.user = Authentication.user;
        $scope.lat=0;
        $scope.longi=0;
        $scope.filters = [];
           $scope.filterLimit = 5;
        
          $scope.longi=$rootScope.coords.longi;
   $scope.lat=$rootScope.coords.lat;
       if (!$scope.user) $location.path('/signin');
       var map;
    $scope.dynMarkers = [];
    $scope.$on('mapInitialized', function(event, evtMap) {
      map = evtMap;
      for (var i=0; i<1000; i++) {
        var latLng = new google.maps.LatLng(markers[i].position[0], markers[i].position[1]);
        $scope.dynMarkers.push(new google.maps.Marker({position:latLng}));
      }
      $scope.markerClusterer = new MarkerClusterer(map, $scope.dynMarkers, {});
    });
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
        Socket.on('job_posted', function(data) {
            console.log(data);
            $scope.jobs.push(data.job);
            console.log($rootScope.coords.lat + "," + $rootScope.coords.longi);

        });
        // $scope.findJobs= function(skip,limit, isPageChange) {
        //   $http.put('jobs/getPaginatedJobs/'+$scope.user._id, {
        //                 skip: skip,
        //                 limit: limit,
        //                 isPageChange:isPageChange
        //             }).success(function(job) {
        //                    $scope.jobs=job.jobs;
        //                    $scope.total=job.total;   


        //             });



        // };
        $scope.findJobs = function(skip, limit, filters, isPageChange) {


            $http.put('jobs/getPaginatedJobs/' + $scope.user._id, {
                skip: skip,
                limit: limit,
                filter: filters,
                isPageChange: isPageChange

            }).success(function(job) {
                $scope.filters1 = [];
                $scope.jobs = job.jobs;

                console.log(job.jobs);
                // $scope.locationFilters=job.filters.locationFilters;
                $scope.total = job.total;
                $scope.candidates = job.candidates;
                job.filters.forEach(function(entry) {
                    $scope.filters1.push(entry);

                });

                if ($scope.firsttime) {
                    $scope.firsttime = false;
                    $scope.filters1.forEach(function(entry) {
                        var alreadyexists = false;
                        for (var h = 0, a = $scope.completefilternames.length; h < a; h++) {

                            if ($scope.completefilternames[h] == entry.type)
                                alreadyexists = true;

                        }
                        if (!alreadyexists)
                            $scope.completefilternames.push(entry.type);


                    });

console.log($scope.completefilternames);


                }
               

            });
        };



        $scope.$watch("currentPage", function(newValue, oldValue) {
            $scope.skip = newValue * $scope.itemsPerPage;
            if ($scope.skip == 0) 
                $scope.findJobs($scope.skip, $scope.itemsPerPage, $scope.filters, false);
             else 
                $scope.findJobs($scope.skip, $scope.itemsPerPage, $scope.filters, true);
        
        });
        $scope.hasApplied = function(job) {
            if ($scope.candidate.jobs.indexOf(job._id) > -1)
                return true;
             else 
                return false;
            
        };

        // Apply for a Job
        $scope.apply = function(job) {

            $http.put('jobs/apply/' + job._id, job).success(function(response) {

                $scope.candidate.jobs.push(job);
                $scope.jobs.splice($scope.jobs.indexOf(job), 1);
                $scope.$apply();
                //And redirect to the index page

                $location.path('jobs/' + job._id);
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

$scope.filterChanged=function(type,name)
{console.log("FILTERCHANGED");
$scope.filters1.forEach(function(entry){

if(name==entry.name)
 {entry.value=!entry.value;
if(entry.value==true)

  $scope.addToFilters(entry.type,entry.name);
else  $scope.removeFromFilters(entry.type,entry.name);
}
});
$scope.findJobs($scope.skip,$scope.itemsPerPage,$scope.filters, false);


}
  

    //addToFilters
    $scope.addToFilters=function(type,name)
     {
 var once=true;
      var alreadyPresentInFilters=false;
         $scope.filters.forEach(function(entry){
          if(type==entry.type && name==entry.name)
                  {
                    alreadyPresentInFilters=true;
                  }
         });

         if(!alreadyPresentInFilters){

          var typeExists = false;
          var feefilters=$scope.filters.slice();
          feefilters.forEach(function(entry){
           
            if(type==entry.type && once){
              once=false;
              typeExists = true;
              $scope.filters.push({type:type,name:name, priority: entry.priority,value:true});
             
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

              $scope.filters.push({type:type,name:name, priority: highest + 1,value:true});
            
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
           $scope.findJobs($scope.skip,$scope.itemsPerPage,$scope.filters, false);

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
      
     $scope.findJobs($scope.skip,$scope.itemsPerPage,$scope.filters, false);
     
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