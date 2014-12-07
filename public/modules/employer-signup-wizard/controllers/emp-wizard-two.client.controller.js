'use strict';

angular.module('employer-signup-wizard').controller('EmpWizardTwoController', ['$scope','$interval',
	function($scope,$interval) {
      var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address':"Sydney, NSW"}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
     
       console.log(results[0].geometry.location)
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
			  $scope.autoRotate = function() {
      var map = $scope.map;
      if (map.getTilt() != 0) {
        $interval(function() {
          var heading = map.getHeading() || 0;
          map.setHeading(heading + 90);
        }, 3000);
      }
    }
	}
]);