'use strict';

angular.module('employer-signup-wizard').controller('EmpWizardOneController', ['$scope', '$http','Industries', 'Countries','$rootScope','geolocation','$stateParams','$state','Authentication',
	function($scope, $http,Industries, Countries,$rootScope,geolocation,$stateParams,$state,Authentication) {
		// Controller Logic
		// ...
		var city1="";
		var country1="";
		var lat=0,lng=0;
		$scope.company={website:"",coordinates:{longitude:0,latitude:0}};
		$scope.employer={};
		$scope.company.specialities = [];
$scope.authentication = Authentication;

		$scope.newSpeciality = {name: ''};
		$scope.employer.role="Admin";
		$scope.user='';
		//Load initial data
		$scope.LoadInitialData = function() {
			if($stateParams.tokenId)
		{
			$http.post('/validatetoken', {token:$stateParams.tokenId}).success(function(response) {
			$scope.user=response;
			$scope.authentication.user = response;
			console.log(response);
			if($scope.user.user=="nothing")
			{

$state.go('home');

			}


			}).error(function(response) {
				$scope.error = response.message;
				
			});

    		console.log($stateParams.tokenId);
		}
		else
		{
			$state.go('home');
		}
			$scope.company.specialities.push({name: 'Product Development'});
			$scope.industries = Industries.getIndustries();
			Countries.getCountries(function(countries){
				$scope.countries = countries;
				// $scope.countries.splice(0, 1);
				$scope.company.country = $scope.countries[1];
				$scope.getCountryCities();
			});
	      	$scope.company.industry = $scope.industries[0].name;
	      	$scope.company.company_size = '1 - 10';
	      	$scope.company.company_type = 'Sole Proprietorship';
	      	InitlocationData();
		};
	var InitlocationData = function(){
		var geocoder = new google.maps.Geocoder();
		geolocation.getLocation().then(function(data){
		 lat = parseFloat(data.coords.latitude);
  		 lng = parseFloat(data.coords.longitude);
  
  		var latlng = new google.maps.LatLng(lat, lng);
  		geocoder.geocode({'latLng': latlng}, function(results, status) {
    	if (status == google.maps.GeocoderStatus.OK) {
	      	if (results[1]) {
		      	var citycountry=results[1].formatted_address;
		      	var res = citycountry.split(",");
		    	country1=res[res.length-1];
		    	city1=res[res.length-2];
		    	city1=city1.trim();
		     	country1=country1.trim();
		   
		     	angular.forEach($scope.countries,function(country){
		          if(country1==country.name)
		          {
		             $scope.company.country=country;
		             $scope.getCountryCities();
		          }
			    });
		    } else {
		        $scope.company.country=$scope.countries[0];
		          $scope.getCountryCities();
		      }
		    } else {
	       $scope.company.country=$scope.countries[0];
		          $scope.getCountryCities();
	    }
	  });
	     
	    });
	}
	

		// $http.get('/countries').success(function(countries) {
		// 	$scope.countries = countries;
		// 	$scope.country = $scope.countries[0].name;
		// 	$scope.getCountryCities();
		// });

		$scope.getCountryCities = function(){
			var foundit=false;
				$http.get('/countries/'+ $scope.company.country.name).success(function (response){
				$scope.cities = response.cities;
				angular.forEach($scope.cities,function(city){
				console.log(city.name+" "+city1);
				if(city.name==city1)//fuck my life
				{
				console.log(city);
				$scope.company.city=city;
				foundit=true;
				}
			});if(!foundit)
				$scope.company.city = $scope.cities[0];
			});
		};

		$scope.SaveAndRedirect = function() {
			if(lng!=0 && lat!=0)
		{	$scope.company.coordinates.longitude=lng;
$scope.company.coordinates.latitude=lat;

$rootScope.coords.lat=lat;
$rootScope.coords.longi=lng;
$rootScope.country="none";
$rootScope.city="none";

}
else
{
$rootScope.coords.lat=0;
$rootScope.coords.longi=0;
$rootScope.country=$scope.company.country;
$rootScope.city=$scope.company.city;

}

// coordinates: {
//         longitude: 0,
//         latitude: 0
//     },
			$scope.success = $scope.error = null;
			
			$http.post('/SaveEmpSignUpWizardOneData', {user:$scope.user,company:$scope.company, employer:$scope.employer}).success(function(response) {
				// $location.path('/');
				$state.go('emp-wizard-two');
				
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		//Add specialities
		$scope.addSpeciality = function() {
			if($scope.newSpeciality.name != ''){
				$scope.company.specialities.push($scope.newSpeciality);
				$scope.newSpeciality = {name: ''};
			}

	    };
	    //Remove Speciality
	    $scope.removeSpeciality = function(index) {
	      $scope.company.specialities.splice(index, 1);
	    };
}


]);