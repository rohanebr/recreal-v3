'use strict';

//Employers service used to communicate Employers REST endpoints
angular.module('employers').factory('Employers', ['$resource',
	function($resource) {
		return $resource('employers/:employerId', { employerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);