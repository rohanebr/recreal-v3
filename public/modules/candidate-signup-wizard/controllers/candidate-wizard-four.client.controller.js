'use strict';

angular.module('candidate-signup-wizard').controller('CandidateWizardFourController', ['$scope','$http','$state','Authentication','Candidates','locationVarification','$location',
	function($scope,$http,$state,Authentication,Candidates,locationVarification,$location) {
		$scope.authentication = Authentication;
        var cityFromRootScope,countryFromRootScope;
        var useGeoLocationInformation=false;        
        if (!$scope.authentication.user)
            $state.go("home");
        var marker;
        var geocoder = new google.maps.Geocoder();


        $scope.candidate={};

        $scope.LoadInitialData = function() {

console.log($scope.authentication.user.candidate);
            $scope.candidate = Candidates.get({ 
                candidateId: $scope.authentication.user.candidate
             }, function success() {
                console.log($scope.candidate);
                   var promise = locationVarification.validateLocation($scope.candidate.location,$scope.candidate.country,$scope.candidate.coordinates.latitude,$scope.candidate.coordinates.longitude).then

                     ( function(responseFromLocationFactory){
         console.log(responseFromLocationFactory[0]);
         if(responseFromLocationFactory[0]=='true'){
                geocoder.geocode({
                    'address': $scope.candidate.location + "," + $scope.candidate.country
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var map = $scope.map;
                        map.center = results[0].geometry.location;
                        $scope.map.setCenter(results[0].geometry.location);
                        marker = new google.maps.Marker({
                                position: new google.maps.LatLng($scope.candidate.coordinates.latitude, $scope.candidate.coordinates.longitude),
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
                    'address': $scope.candidate.location + "," + $scope.candidate.country
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        console.log(results[0].geometry.location.lat());
                        $scope.candidate.coordinates.latitude = results[0].geometry.location.lat();
                        $scope.candidate.coordinates.longitude = results[0].geometry.location.lng();
                        var map = $scope.map;
                        map.center = results[0].geometry.location;
                        $scope.map.setCenter(results[0].geometry.location);
                        marker = new google.maps.Marker({
                                position: new google.maps.LatLng($scope.candidate.coordinates.latitude,$scope.candidate.coordinates.longitude),
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

                 
            // $scope.authentication = Authentication;
            // Find existing Candidate
            // $scope.candidate = Candidates.get({ 
            //     candidateId: $scope.authentication.user.candidate
            // });
        };


        $scope.Back = function() {
          $location.path("candidate-wizard-three");
        };
        $scope.SaveAndRedirect = function() {
            $scope.success = $scope.error = null;

            if($scope.candidate.stage=='Four')
            {
                //$scope.candidate.stage = 'Five';
                $scope.candidate.stage = 'Complete';
            }

            var candidate = $scope.candidate ;
            candidate.coordinates.latitude= marker.position.k;
            candidate.coordinates.longitude= marker.position.D;
            console.log(candidate);
            candidate.$update(function() {
                 $state.go('home');// redirect to page five which contains MCQs
            }, function(errorResponse) {
                 $scope.error = response.message;
            });
        };
        $scope.SkipAndRedirect = function() {
            $scope.success = $scope.error = null;

            if($scope.candidate.stage=='Four')
            {
                //$scope.candidate.stage = 'Five';
                $scope.candidate.stage = 'Complete';
            }

            var candidate = $scope.candidate ;
            candidate.$update(function() {
                 $state.go('home');// redirect to page five which contains MCQs
            }, function(errorResponse) {
                 $scope.error = response.message;
            });
        };
	}
]);