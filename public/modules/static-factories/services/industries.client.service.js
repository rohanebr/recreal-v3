'use strict';

angular.module('static-factories').factory('Industries', [
	function() {
		// Industries service logic
		// ...
		var factory = {};
		var industries = [
				{name: 'IT'},
				{name: 'Health Care'},
				{name: 'Construction'},
				{name: 'Hospitality'},
				{name: 'Telecom'}		
			];

		// Public API
		factory.getIndustries = function() {
				return industries;
			};
		return factory;
	}
]);