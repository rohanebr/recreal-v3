'use strict';

angular.module('employer-signup-wizard').controller('EmpWizardOneController', ['$scope', '$http',
	function($scope, $http) {
		// Controller Logic
		// ...
		$http.get('/countries').success(function(countries) {
			$scope.countries = countries;
			$scope.country = $scope.countries[0].name;
			getCountryCities();
		});
		$scope.getCountryCities = function(){
			$http.get('/countries/'+ $scope.country).success(function (response){
			
			$scope.cities = response.cities;
			$scope.city = $scope.cities[0].name;
			});
		}

	}
]);
