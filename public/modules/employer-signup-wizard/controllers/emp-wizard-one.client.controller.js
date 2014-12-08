'use strict';

angular.module('employer-signup-wizard').controller('EmpWizardOneController', ['$scope', '$http','Industries', 'Countries','$rootScope','geolocation',
	function($scope, $http,Industries, Countries,$rootScope,geolocation) {
		// Controller Logic
		// ...
		$scope.company={};
		$scope.employer={};
		var geocoder = new google.maps.Geocoder();
		geolocation.getLocation().then(function(data){
	var lat = parseFloat(data.coords.latitude);
  var lng = parseFloat(data.coords.longitude);
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
      	var citycountry=results[1].formatted_address;

       console.log(citycountry);
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
     
    });
	
      	$scope.industries = Industries.getIndustries();

		Countries.getCountries(function(countries){
			$scope.countries = countries;
			// $scope.countries.splice(0, 1);
			$scope.company.country = $scope.countries[0];
			$scope.getCountryCities();
		});
		

		

		// $http.get('/countries').success(function(countries) {
		// 	$scope.countries = countries;
		// 	$scope.country = $scope.countries[0].name;
		// 	$scope.getCountryCities();
		// });

		$scope.getCountryCities = function(){
				$http.get('/countries/'+ $scope.company.country.name).success(function (response){
				$scope.cities = response.cities;
				$scope.company.city = $scope.cities[0];
			});
		}

		$scope.SaveAndRedirect = function() {
			$scope.success = $scope.error = null;
			
			$http.post('/SaveEmpSignUpWizardOneData', {company:$scope.company, employer:$scope.employer}).success(function(response) {
				// If successful show success message and clear form
				
			}).error(function(response) {
				$scope.error = response.message;
			});
		};



		
	}
]);