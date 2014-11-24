'use strict';

angular.module('core').controller('EmployerLandingController', ['$scope',
	function($scope) {
		// Controller Logic
		// ...
		// open signin
		$scope.openSigninModal = function() {
	     
	     	var mesg = $modal.open({
	        templateUrl: '/modules/short-list/views/message/message.html',
	        controller: 'AuthenticationController'
	      });
	      mesg.result.then(function(result) 
	       {
	       	console.log(result);
	      //    $scope.sendmessage = result.sendmessage;
	       }, 
	      function() {

	      });
	    };
	}
]);