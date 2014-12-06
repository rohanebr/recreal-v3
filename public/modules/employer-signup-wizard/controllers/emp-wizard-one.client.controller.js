'use strict';

angular.module('employer-signup-wizard').controller('EmpWizardOneController', ['$scope', '$http', 'Countries',
	function($scope, $http, Countries) {
		// Controller Logic
		// ...
		

		
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
		
	}
]);