'use strict';

angular.module('employer-signup-wizard').controller('EmpWizardOneController', ['$scope', 'toaster',
	function($scope, toaster) {
		// Controller Logic
		// ...
		$scope.pop = function(){
            toaster.pop('success', "title", "text");
        };

	}
]);