'use strict';

angular.module('candidate-jobs').controller('SearchJobsController', ['$scope', 'Jobs', '$http', 'Authentication', 'Candidates', '$location','Socket','$rootScope','$stateParams',
	function($scope, Jobs, $http, Authentication, Candidates, $location,Socket,$rootScope,$stateParams) {
console.log( $rootScope.coords.lat+","+ $rootScope.coords.longi);
$scope.itemsPerPage = 10;
        $scope.currentPage = 0;
        $scope.isPageChange=false;
        $scope.skip = 0;
		$scope.user = Authentication.user;
        $scope.firsttime=true;
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
 // 		Socket.on('job_posted',function(data){
	// 		console.log(data);
 //            $scope.jobs.push(data.job);
 // console.log( $rootScope.coords.lat+","+ $rootScope.coords.longi);

	// 	});
$scope.findJobs= function(skip,limit, isPageChange) {
	 $http.put('jobs/searchedJobs/'+$scope.user._id, {
                keyword: $stateParams.keyword,
                skip: skip,
                limit: limit,
                isPageChange:isPageChange
            }).success(function(job) {
                   $scope.jobs=job.jobs;
                   $scope.total=job.total;   
                
                 
               
                      


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


$scope.filterChanged=function(type,name)
{
$scope.filters1.forEach(function(entry){

if(name==entry.name)
 {entry.value=!entry.value;
if(entry.value==true)

  $scope.addToFilters(entry.type,entry.name);
else  $scope.removeFromFilters(entry.type,entry.name);
}
});
//$scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, false);


};
  

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



          

     

    

     };

     //removeFromFilters
      $scope.removeFromFilters=function(type,name)
     {
      
           $scope.filters.forEach(function(entry){
                if(type==entry.type && name==entry.name)
                
                                      $scope.filters.splice($scope.filters.indexOf(entry),1);

                
                        
          });
          //  $scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, false);

     };
  $scope.openFilterModal = function (filterArray, name) {

    var modalInstance = $modal.open({
      templateUrl: '/modules/candidate-jobs/views/search-job/filter-modal.html',
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
      
     //$scope.findCandidates($scope.skip,$scope.itemsPerPage,$scope.filters, false);
     
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