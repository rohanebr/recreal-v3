'use strict';

// Messages controller
angular.module('messages').controller('MessagesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Messages','$http',
	function($scope, $stateParams, $location, Authentication, Messages,$http ) {
		$scope.authentication = Authentication;
        $scope.messages=[];
        $scope.unreadmessages=0;
       $scope.listMessages = function()
       {
         $http.get('/getAllMessagesWithFlagForUnread/' + $scope.authentication.user._id).success(function(res)
         	{
             $scope.messages=res;
             console.log(res);
             for(var s=0,len=$scope.messages.length;s<len;s++)
             	if(!$scope.messages[s].readByReceiver)
             		$scope.unreadmessages++;
             console.log("UNREAD:"+$scope.unreadmessages);


         	});



       };
		// Create new Message
		$scope.create = function() {
			// Create new Message object
			var message = new Messages ({
				name: this.name
			});

			// Redirect after save
			message.$save(function(response) {
				$location.path('messages/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Message
		$scope.remove = function( message ) {
			if ( message ) { message.$remove();

				for (var i in $scope.messages ) {
					if ($scope.messages [i] === message ) {
						$scope.messages.splice(i, 1);
					}
				}
			} else {
				$scope.message.$remove(function() {
					$location.path('messages');
				});
			}
		};

		// Update existing Message
		$scope.update = function() {
			var message = $scope.message ;

			message.$update(function() {
				$location.path('messages/' + message._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Messages
		$scope.find = function() {
			$scope.messages = Messages.query();
		};

		// Find existing Message
		$scope.findOne = function() {
			$scope.message = Messages.get({ 
				messageId: $stateParams.messageId
			});
		};
	}
]);