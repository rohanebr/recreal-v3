'use strict';

angular.module('employer-signup-wizard').controller('EmpWizardOneController', ['$scope', '$http', 'Countries',
	function($scope, $http, Countries) {
		// Controller Logic
		// ...
		$scope.country="Pakistan";
		$scope.countries=[];

		
		Countries.getCountries(function(countries){
			$scope.countries = countries;
			// $scope.countries.splice(0, 1);
			$scope.country = $scope.countries[$scope.countries.length-1].name;
			$scope.getCountryCities();
		});
		

		

		// $http.get('/countries').success(function(countries) {
		// 	$scope.countries = countries;
		// 	$scope.country = $scope.countries[0].name;
		// 	$scope.getCountryCities();
		// });

		$scope.getCountryCities = function(){
				$http.get('/countries/'+ $scope.country).success(function (response){
				$scope.cities = response.cities;
				$scope.city = $scope.cities[$scope.cities.length-1].name;
			});
		}
		
	}
]);