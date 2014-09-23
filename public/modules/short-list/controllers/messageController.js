'use strict';

angular.module('short-list').controller('messageController', [
  '$scope', '$modalInstance', '$http', 'reciever', 'Authentication', function($scope, $modalInstance, $http, reciever, Authentication) {

    		$scope.authentication = Authentication;

			$scope.user = Authentication.user;

		 	$scope.ok = function (action) {
			$modalInstance.close();
			};

			$scope.cancel = function () {
			$modalInstance.dismiss('cancel');

			};	

			$scope.recieverId = reciever._id;
			$scope.reciever = reciever;

			$scope.subject = "Hello!!!";
			$scope.messageBody = "This is a system generated message for debbugin...";



			// Remove from Short List
		$scope.sendMessage = function() {

				var attribute = {
					recieverId: $scope.reciever.user,
					subject: $scope.subject,
					messageBody: $scope.messageBody
				};

			$http.put('/users/sendMessage/' + $scope.user._id , attribute).success(function(response) {

				//And redirect to the index page
				alert(response.message);
				$modalInstance.dismiss('cancel');

				// $location.path('jobs/' + job._id);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
		}


  
]);
