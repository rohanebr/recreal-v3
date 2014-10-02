'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Socket', 'Authentication', 'Menus',
	function($scope, Socket, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		 Socket.on('message_sent', function (data) {
		    if(data.message.recieverId === $scope.authentication.user._id )
		    	var thread = {
		    		senderName: 'Ch. Rehmat Ali',
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

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);