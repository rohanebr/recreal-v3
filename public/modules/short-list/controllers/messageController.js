'use strict';

angular.module('short-list').controller('messageController', [
  '$scope', 'Socket', '$modalInstance', '$http', 'reciever', 'Authentication', function($scope, Socket, $modalInstance, $http, reciever, Authentication) {

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



			// Remove from Short List
		$scope.sendMessage = function(message) {

			var attribute = {
				recieverId: $scope.reciever.user,
				subject: message.subject,
				messageBody: message.messageBody
			};

			$http.put('/users/sendMessage/' + $scope.user._id , attribute).success(function(response) {

				Socket.emit('message_sent', {message: attribute});
				$modalInstance.dismiss('cancel');

				// $location.path('jobs/' + job._id);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
		}


  
]);
