'use strict';

angular.module('empoyer-jobs').controller('EmpJobPostOneController', ['$scope','Industries',
	function($scope,Industries) {
		// Controller Logic
		// ...
		$scope.industries = Industries.getIndustries();

		$scope.SaveAndRedirect = function() {
			$scope.success = $scope.error = null;
			
			$http.post('/SaveEmpJobPostOneData', $scope.job).success(function(response) {
				// If successful show success message and clear form
				
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

	}
]);