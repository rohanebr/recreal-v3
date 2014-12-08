'use strict';

angular.module('empoyer-jobs').controller('EmpJobPostTwoController', ['$scope',
	function($scope) {
	

		$scope.SaveAndRedirect = function() {
			$scope.success = $scope.error = null;
			
			$http.post('/SaveEmpJobPostTwoData', $scope.job).success(function(response) {
				// If successful show success message and clear form
				
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

	}
]);