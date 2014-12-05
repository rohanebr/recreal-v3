'use strict';

angular.module('static-factories').factory('Countries', [
	function() {
		// Industries service logic
		// ...
		var factory = {};
		

		// Public API
		factory.getCountries = function() {
				return countries;
			};
		return factory;
	}
]);


