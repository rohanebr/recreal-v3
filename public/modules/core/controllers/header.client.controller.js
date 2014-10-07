'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', 'Socket',
	function($scope, Authentication, Menus, Socket) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		

		if($scope.authentication.user){
			Socket.on('message_sent_to', function (data) {
				if(data.message.recieverId === $scope.authentication.user._id )
					var thread = {
						senderName: data.message.sender.displayName,
						subject: data.message.subject,
						created: Date.now(),
						messages: [{
							messageBody: data.message.messageBody,
						}]
					}
					$scope.authentication.user.threads.push(thread);
					$scope.$apply();
					// alert(data.message.subject + ' --------------> ' + data.message.messageBody);
			});
		}
		

		$scope.$on('$destroy', function (event) {
        socket.removeAllListeners();
        // or something like
        // socket.removeListener(this);
   		});


		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);