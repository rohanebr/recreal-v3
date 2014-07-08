'use strict';

// Employers controller
angular.module('employers').controller('EmployersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Employers',
	function($scope, $stateParams, $location, Authentication, Employers ) {
		$scope.authentication = Authentication;

		// Create new Employer
		$scope.create = function() {
			// Create new Employer object
			var employer = new Employers ({
				name: this.name
			});

			// Redirect after save
			employer.$save(function(response) {
				$location.path('employers/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Employer
		$scope.remove = function( employer ) {
			if ( employer ) { employer.$remove();

				for (var i in $scope.employers ) {
					if ($scope.employers [i] === employer ) {
						$scope.employers.splice(i, 1);
					}
				}
			} else {
				$scope.employer.$remove(function() {
					$location.path('employers');
				});
			}
		};

		// Update existing Employer
		$scope.update = function() {
			var employer = $scope.employer ;

			employer.$update(function() {
				$location.path('employers/' + employer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Employers
		$scope.find = function() {
			$scope.employers = Employers.query();
		};

		// Find existing Employer
		$scope.findOne = function() {
			$scope.employer = Employers.get({ 
				employerId: $stateParams.employerId
			});
		};
	}
]);