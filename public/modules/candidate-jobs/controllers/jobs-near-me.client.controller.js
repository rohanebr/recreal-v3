'use strict';

angular.module('candidate-jobs').controller('jobsNearMeController', ['$scope' ,'$location','$http','geolocation','$window',
    function($scope, $location,$http,geolocation,$window) 
    {
    	var marker;
    	var geocoder = new google.maps.Geocoder();
        
        $scope.apply = function(job){

         $window.open(job.url);
       
    


    };

        //find all jobs near the person within 10 kms
    	$scope.findJobsNearMe = function()
    	{
    		
            geolocation.getLocation().then(function(data) {
			var latlng =new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
  					geocoder.geocode({
                        'latLng': latlng
                    }, function(results, status) {

                    	$scope.map.setCenter(new google.maps.LatLng(data.coords.latitude, data.coords.longitude));
  					    marker = new google.maps.Marker({
                                position: new google.maps.LatLng(data.coords.latitude, data.coords.longitude),
                                map: $scope.map,
                                draggable: true,
                                animation: google.maps.Animation.DROP,
                                title: "You are here!"
                            });
                          var cityCircle = new google.maps.Circle({
                                                strokeColor: '#FF0000',
                                                strokeOpacity: 0.8,
                                                strokeWeight: 2,
                                                fillColor: '#000000',
                                                fillOpacity: 0.35,
                                                map: $scope.map,
                                                center: new google.maps.LatLng(data.coords.latitude, data.coords.longitude),
                                                radius: 20000
    });





                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[1]) {
                                var citycountry = results[1].formatted_address;
                                var res = citycountry.split(",");
                                var countryFromDB = res[res.length - 1].trim();
                                var cityFromDB = res[res.length - 2].trim();
                                
                               	$http.post('/job/jobsNearMe/',{city:cityFromDB,country:countryFromDB,lat:data.coords.latitude,lng:data.coords.longitude}).success(function(response){

                                      $scope.jobs = response.jobs;
                                      for(var i=0;i<$scope.jobs.length;i++)
                                      {
                                        var jobTitle =  response.jobs[i].title;
                                        var map = $scope.map;
                                        marker = new google.maps.Marker({
                                                                     position:  new google.maps.LatLng(response.jobs[i].JobLat, response.jobs[i].JobLng),
                                                                     map: map,
                                                                     draggable: true,
                                                                     animation: google.maps.Animation.DROP,
                                                                     title: jobTitle,
                                                                     url: "#!/rozeeJobs/"+response.jobs[i]._id,
                                                                     selectedJob: response.jobs[i]
                                                                   });
                                        google.maps.event.addListener(marker, 'mouseover', function() {
                                                  
                                                  $scope.selectedJob = this.selectedJob;
                                                  console.log($scope.selectedJob);
                                                 $scope.$apply();
    });                                 }

    
                                   
                               	});
                               
                            }
                        }
                    });
                
            });


    	}
    }

    ]);