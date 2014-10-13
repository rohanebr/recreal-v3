'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', 'Socket','$http',
	function($scope, Authentication, Menus, Socket,$http) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		$scope.threads=[];
       var thread=[];
		
   //add code to refresh the header if thread is coming through the socket
		if($scope.authentication.user){
			
	 Socket.on('watched_thread_to', function(event, args) {
			$scope.threads=[];
		 	console.log("wactched_thread_to works");



        $http.get('/users/getMessages/' + $scope.authentication.user._id).success(function(res) {
          	
          	 
           	if(res.length>1)
           	{
              for(var x=1;x<res.length;x++)
                    $scope.threads.push(res[x]);

          	} 
      
           
        
		 	}).error(function(data, status, headers, confige) {
				
		 		console.log("Shouldnt have happened");
	 	});


		 }); 
		
			
      

    
    	$http.get('/users/getMessages/' + $scope.authentication.user._id).success(function(res) {
    		 	console.log(res+"weird");
          	if(res.length>1)
          	{
             for(var x=1;x<res.length;x++)
                    $scope.threads.push(res[x]);

          	}
        
			}).error(function(data, status, headers, confige) {
				
				console.log("Shouldnt have happened");
			});


			
			Socket.on('message_sent_to', function (data) {
                
                 
				if(data.message.receiver === $scope.authentication.user._id )
					{
console.log(data.message);
			
						var thread = {
							id:data.message._id || data.message.id,
						senderName: data.message.sender.displayName,
						//subject: data.message.subject,
						created: data.message.messages.created    //wrong this shldnt be Data.now()
						//messages: [{
					//		messageBody: data.message.messageBody,
					//	}]
					}
				}
					$scope.threads.push(thread);
					$scope.$apply();
					// alert(data.message.subject + ' --------------> ' + data.message.messageBody);
			});
		}


		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);