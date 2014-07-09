'use strict';

angular.module('empoyer-jobs').controller('PostJobController', ['$scope', '$location', 'Authentication', 'Jobs',
	function($scope, $location, Authentication, Jobs) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');

		// Create new Job
		$scope.create = function() {
			// Create new Job object
			var job = new Jobs ({
				title: this.title,
				description: this.description
			});

			// Redirect after save
			job.$save(function(response) {
				$location.path('jobs/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
			this.description = '';
		};
	}
]);