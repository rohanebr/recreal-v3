'use strict';

angular.module('static-factories').factory('Countries', ['$http',
	function($http) {
		// Industries service logic
		// ...
		var factory = {};
		
		var cachedCountries = [];

		// Public API
		factory.getCountries = function(callback) {
			if(!cachedCountries){
				callback(cachedCountries);
			}
			else{
				$http.get('/countries').success(function(countries) {
				cachedCountries = countries;
				callback(countries);			
			});
			}
		};
		return factory;
	}
]);