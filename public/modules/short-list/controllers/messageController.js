'use strict';

angular.module('short-list').controller('messageController', [
  '$scope', 'Socket', '$modalInstance', '$http', 'reciever', 'Threads', 'Authentication', function($scope, Socket, $modalInstance, $http, reciever, Threads, Authentication) {

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



		// 	// Remove from Short List
		// $scope.sendMessage = function(message) {

		// 	var attribute = {
		// 		recieverId: $scope.reciever.user,
		// 		sender: $scope.user,
		// 		subject: message.subject,
		// 		messageBody: message.messageBody
		// 	};

		// 	$http.put('/users/sendMessage/' + $scope.user._id , attribute).success(function(response) {

		// 		Socket.emit('message_sent_from', {message: attribute});
		// 		$modalInstance.dismiss('cancel');

		// 		// $location.path('jobs/' + job._id);
		// 	}).error(function(response) {
		// 		$scope.error = response.message;
		// 	});
		// };

		// Remove from Short List
		$scope.sendMessage = function(message) {

			// Create new Thread object
			var thread = new Threads ({
				sender: $scope.user._id,
				receiver: $scope.reciever.user,
				subject:  message.subject,
				readBySender: true,
				messages: [{
					messageBody: message.messageBody,
					author: $scope.user._id,
					created :Date.now()
				}]
			});
         
		
			thread.$save(function(response) {
				console.log(response.receiver);
                	var thread1={
				idc:response._id,
				receiver: response.receiver,
                sender: {displayName:$scope.user.displayName},
				
				messages: {created :Date.now()}

			};
            console.log(Date.now());
		        Socket.emit('message_sent_from', {message: thread1});
				$modalInstance.dismiss('cancel');
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			
		};


	}


  
]);
