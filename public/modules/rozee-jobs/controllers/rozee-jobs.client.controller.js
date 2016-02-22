'use strict';

// Jobs controller
angular.module('rozeeJobs').controller('rozeeJobsController', ['$http', '$scope', '$stateParams', '$location', 'Authentication','$window',
	function($http, $scope, $stateParams, $location, Authentication,$window ) {
	// Find existing Job
	var marker;
	 var geocoder = new google.maps.Geocoder();
		$scope.findOne = function() {

	                
                  $http.get('scrappedjobs/'+$stateParams.jobId).success(function(response){

                  	 $scope.job = response.job;
                  	 $scope.companyOtherJobs = response.companyOtherJobs;
                  	 $scope.relatedJobs = response.relatedJobs;
                   
                      geocoder.geocode({
                    'address': response.job.JobLocation
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        console.log(results[0].geometry.location.lat());
                        $scope.latitude = results[0].geometry.location.lat();
                        $scope.longitude = results[0].geometry.location.lng();
                        var map = $scope.map;
                        map.center = results[0].geometry.location;
                        $scope.map.setCenter(results[0].geometry.location);
                        marker = new google.maps.Marker({
                                position: new google.maps.LatLng($scope.latitude, $scope.longitude),
                                map: map,
                                draggable: true,
                                animation: google.maps.Animation.DROP,
                                title: $scope.job.title
                            });
                        
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
                  }).error(function(response){});



			
    

           
         
		};

		$scope.apply = function(job){
			   $window.open(job.url);
			   $location.path('/candidate-open-jobs');
		


		};

	}]);