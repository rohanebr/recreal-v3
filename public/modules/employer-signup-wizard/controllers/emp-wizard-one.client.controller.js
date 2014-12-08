'use strict';

angular.module('employer-signup-wizard').controller('EmpWizardOneController', ['$scope', '$http','Industries', 'Countries','$rootScope',
	function($scope, $http,Industries, Countries,$rootScope) {
		// Controller Logic
		// ...
		$scope.longi= $rootScope.coords.longi;
		$scope.lat=$rootScope.coords.lat;
      	$scope.industries = Industries.getIndustries();

		Countries.getCountries(function(countries){
			$scope.countries = countries;
			// $scope.countries.splice(0, 1);
			$scope.country = $scope.countries[0];
			$scope.getCountryCities();
		});
		

		

		// $http.get('/countries').success(function(countries) {
		// 	$scope.countries = countries;
		// 	$scope.country = $scope.countries[0].name;
		// 	$scope.getCountryCities();
		// });

		$scope.getCountryCities = function(){
				$http.get('/countries/'+ $scope.country.name).success(function (response){
				$scope.cities = response.cities;
				$scope.city = $scope.cities[0];
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