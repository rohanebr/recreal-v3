'use strict';

angular.module('core').controller('EmployerLandingController', ['$scope', '$modal',
	function($scope, $modal) {
		// Controller Logic
		// ...
		// open signin
		$scope.openPostjobModal = function() {
	     
	     	var modalInstance = $modal.open({
	        templateUrl: '/modules/employer-signup-wizard/views/partials/employer-signup-partial.html',
	        controller: 'EmpSignupController'
	      });
	      modalInstance.result.then(function(result) 
	       {
	       	console.log(result);
	      //    $scope.sendmessage = result.sendmessage;
	       }, 
	      function() {

	      });
	    };
	}
]);