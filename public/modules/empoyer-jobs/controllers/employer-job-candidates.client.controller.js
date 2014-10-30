'use strict';

angular.module('empoyer-jobs').controller('EmployerJobCandidatesController', ['$scope', '$filter', 'Jobs', '$stateParams', '$http',
	function($scope, $filter, Jobs, $stateParams, $http) {
		
		$scope.locationFilters = [];
		$scope.salaryFilters = [];
		$scope.visaFilters = [];
		$scope.employeetypeFilters = [];
		$scope.employeestatusFilters = [];
		 $scope.itemsPerPage =10;
  $scope.currentPage = 0;

  $scope.range = function() {
    var rangeSize = 5;
    var ret = [];
    var start;

    start = $scope.currentPage;
    if ( start > $scope.pageCount()-rangeSize ) {
      start = $scope.pageCount()-rangeSize;
    }

    for (var i=start; i<start+rangeSize; i++) {
    	if(i>=0)
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
  	console.log($scope.total+" "+$scope.itemsPerPage);
  	 console.log($scope.total/$scope.itemsPerPage);
    return Math.ceil($scope.total/$scope.itemsPerPage);

  };

  $scope.setPage = function(n) {
  	console.log("EVERYTIME ITS CALLED");
    if (n >= 0 && n < $scope.pageCount()) {

      $scope.currentPage = n;
      console.log($scope.currentPage);
    }
  };

  $scope.$watch("currentPage", function(newValue, oldValue) {
console.log("CURRENT PAGE");
  		$http.put('jobs/getPaginatedCandidates/' + $stateParams.jobId,{skip:newValue*$scope.itemsPerPage,limit:$scope.itemsPerPage}).success(function(job) {
			
			$scope.pagedItems=$scope.job.candidates;
			$scope.total=$scope.job.candidates.length;

			$scope.candidates = job.candidates;
			$scope.filteredCandidates = $scope.candidates;
		});
   
  });		
		$scope.isShortListed = function(candidate){

			var ans = false;
			angular.forEach($scope.job.shortListedCandidates, function(item){
				if (item.candidate == candidate._id)
					ans = true;
			});
			return ans;
		};

		$scope.findCandidates=function(){
		
		$http.put('jobs/getPaginatedCandidates/' + $stateParams.jobId,{skip:0,limit:$scope.itemsPerPage,filter:"general"}).success(function(job) {
			$scope.job = job.job;
			$scope.locationFilters=job.filters.locationFilters;
			$scope.salaryFilters = job.filters.salaryFilters;
			$scope.visaFilters=job.filters.visaFilters;
			$scope.employeetypeFilters=job.filters.employeetypeFilters;
				$scope.employeestatusFilters=job.filters.employeestatusFilters;
			$scope.candidates=$scope.job.candidates;

			$scope.total=job.totalentries;
            console.log($scope.total);
		});
	}
		// $http.get('jobs/candidates/' + $stateParams.jobId).success(function(job) {
		// 	$scope.job = job;
		// 	$scope.candidates = job.candidates;
		// 	$scope.filteredCandidates = $scope.candidates;

			
			// Add to Short List
		$scope.addCandidateToShortList = function(candidate) {

			var attribute = {
					jobId: $scope.job._id,
					candidateId: candidate._id
				}

				
			$http.put('jobs/addToShortList/' + $scope.job._id , attribute).success(function(response) {

				$scope.job.shortListedCandidates.push({
					candidate: candidate._id
				});
				// $scope.$apply();
				

				// $scope.candidate.jobs.push(job);
				// $scope.jobs.splice($scope.jobs.indexOf(job), 1);
				// $scope.$apply();
				

				// $location.path('jobs/' + job._id);
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

			$http.put('jobs/removeFromShortList/' + $scope.job._id , attribute).success(function(response) {
				
			angular.forEach($scope.job.shortListedCandidates, function(item){
				if (item.candidate == candidate._id)
					$scope.job.shortListedCandidates.splice($scope.job.shortListedCandidates.indexOf(item),1);
				});
				//And redirect to the index page

				$location.path('jobs/' + job._id);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};


		// });
		// $scope.search.name = 'Rawalpindi';



		var populateLocationFilters = function(){
			
			$scope.candidates = $filter('orderBy')($scope.candidates, 'location');
			var filterValue = 'invalid_value';
			for (var i = 0 ; i < $scope.candidates.length ; i++ ){
				var candidate = $scope.candidates[i];
				if(candidate.location !== filterValue){
					filterValue = candidate.location;
					$scope.locationFilters.push({
						name: filterValue,
						count: 0,
						value: false
					});
				}
				$scope.locationFilters[$scope.locationFilters.length - 1].count++;
			}
		};

		var populateSalaryFilters = function(){
			
			$scope.candidates = $filter('orderBy')($scope.candidates, 'salary_expectation');
			var filterValue = 'invalid_value';
			for (var i = 0 ; i < $scope.candidates.length ; i++ ){
				var candidate = $scope.candidates[i];
				if(candidate.salary_expectation !== filterValue){
					filterValue = candidate.salary_expectation;
					$scope.salaryFilters.push({
						name: filterValue,
						count: 0,
						value: false
					});
				}
				$scope.salaryFilters[$scope.salaryFilters.length - 1].count++;
			}
		};

		var populateVisaFilters = function(){
			
			$scope.candidates = $filter('orderBy')($scope.candidates, 'visa_status');
			var filterValue = 'invalid_value';
			for (var i = 0 ; i < $scope.candidates.length ; i++ ){
				var candidate = $scope.candidates[i];
				if(candidate.visa_status !== filterValue){
					filterValue = candidate.visa_status;
					$scope.visaFilters.push({
						name: filterValue,
						count: 0,
						value: false
					});
				}
				$scope.visaFilters[$scope.visaFilters.length - 1].count++;
			}
		};


		
		
		var populateEmployeestatusFilters = function(){
			
			$scope.candidates = $filter('orderBy')($scope.candidates, 'employee_status');
			var filterValue = 'invalid_value';
			for (var i = 0 ; i < $scope.candidates.length ; i++ ){
				var candidate = $scope.candidates[i];
				if(candidate.employee_status !== filterValue){
					filterValue = candidate.employee_status;
					$scope.employeestatusFilters.push({
						name: filterValue,
						count: 0,
						value: false
					});
				}
				$scope.employeestatusFilters[$scope.employeestatusFilters.length - 1].count++;
			}
		};

		
		var populateEmployeetypeFilters = function(){
			
			$scope.candidates = $filter('orderBy')($scope.candidates, 'employee_type');
			var filterValue = 'invalid_value';
			for (var i = 0 ; i < $scope.candidates.length ; i++ ){
				var candidate = $scope.candidates[i];
				if(candidate.employee_type !== filterValue){
					filterValue = candidate.employee_type;
					$scope.employeetypeFilters.push({
						name: filterValue,
						count: 0,
						value: false
					});
				}
				$scope.employeetypeFilters[$scope.employeetypeFilters.length - 1].count++;
			}
		};

		

}
]);


