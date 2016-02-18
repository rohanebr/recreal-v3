'use strict';


angular.module('employer-signup-wizard').controller('EmpWizardTwoController', ['$scope','Users', 'Employers', '$interval', 'Authentication', '$state', '$http', '$location','$rootScope','locationVarification',
    function($scope,Users, Employers, $interval, Authentication, $state, $http, $location,$rootScope,locationVarification) {
        $scope.authentication = Authentication;
        var cityFromRootScope,countryFromRootScope;
        var useGeoLocationInformation=false;        
        if (!$scope.authentication.user)
            $state.go("home");
        $scope.latitude = 0;
        $scope.longitude = 0;
        $scope.myValue = true;
        var marker;
        var geocoder = new google.maps.Geocoder();

        $scope.SaveAndRedirect = function()
        {
            console.log(marker.position.D);
            $http.post('/savelatlong', {
                user: $scope.authentication.user,
                latitude: marker.position.k,
                longitude: marker.position.D
            }).success(function(response) {
               
                $scope.employer = Employers.get({
                    employerId: response
                }, function(employer) {
                  
                    if (employer.jobs.length > 0) { // edit first job
                        $location.path('emp-job-post-one-edit/' + employer.jobs[0]);
                    } else { // create new job
                        $location.path('emp-job-post-one');
                    }
                });
            });
        };

        $scope.SkipAndRedirect = function (){
            var user = new Users($scope.authentication.user);
            if(user.stage == 'CompanyLocation')
            {
                user.stage = 'NoJobs';
            }
            user.$update(function(response) {
                $scope.success = true;
                Authentication.user = response;
                $location.path('emp-job-post-one/');
            }, function(response) {
                $scope.error = response.data.message;
            });
        };

        $scope.Back = function() {
          $location.path("emp-wizard-one/" + $scope.authentication.user.activeToken);
        };




        $scope.LoadInitialData = function() {
            $http.post('/getCountryCity', {
                user: $scope.authentication.user
            }).success(function(response) {
                  
                      var promise = locationVarification.validateLocation(response.city,response.country,response.latitude,response.longitude).then

                     ( function(responseFromLocationFactory){

         if(responseFromLocationFactory[0]=='true'){
                geocoder.geocode({
                    'address': response.city + "," + response.country
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var map = $scope.map;
                        map.center = results[0].geometry.location;
                        $scope.map.setCenter(results[0].geometry.location);
                        marker = new google.maps.Marker({
                                position: new google.maps.LatLng(response.latitude, response.longitude),
                                map: map,
                                draggable: true,
                                animation: google.maps.Animation.DROP,
                                title: "Select your company Location!"
                            });
                        
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }
            else
            {

             geocoder.geocode({
                    'address': response.city + "," + response.country
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
                                title: "Select your company Location!"
                            });
                        
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });


            }










                      });
           


                
            });
        };
    }
]);