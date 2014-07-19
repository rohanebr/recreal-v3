'use strict';

angular.module('static-factories').filter('locationFilter', [
	function() {
		return function(input, filter, isEnable) {
			// if isEnable then filter out wines
			if (isEnable) {
			  var result = [];
			  angular.forEach(input, function (candidate) {
			      angular.forEach(filter, function (filter) {
			          if (filter.value && filter.name === candidate.location) {
			              result.push(candidate);
			          }
			      });
			  });
			  return result;
			} 
			// otherwise just do not any filter just send input without changes
			else{
			  return input;
			}
		};
	}
]);