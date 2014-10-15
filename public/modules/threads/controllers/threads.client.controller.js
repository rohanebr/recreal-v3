'use strict';

// Threads controller
angular.module('threads').controller('ThreadsController', ['$scope', '$stateParams','$location', 'Authentication', 'Threads', '$http','Socket',
	function($scope, $stateParams, $location, Authentication, Threads, $http,Socket ) {
		$scope.authentication = Authentication;
        $scope.color="color:green";
        $scope.color2="color:red";
        Socket.on("i_am_here", function (data){

        	   for(var x=0,b=$scope.thread.messages.length;x<b;x++)
        	   {
                    if($scope.thread.messages[x].author._id===data.userId)
                    	     $scope.thread.messages[x].author.isOnline=data.isOnline;

        	   }
            
        }); 

        //socket incoming_thread start
        Socket.on("incoming_thread", function (data) {
        	
            $scope.thread.messages.push({
            	                         messageBody:data.messageBody,
						                 author:{
						                 	     displayName:data.author,
						                 	     picture_url:data.authordp },
							             created:data.created
							           });
		
        });
        //socket incoming_thread end

        // $scope.$on("$destroy", function handler() 
        //    {
       
        //     if($scope.thread.sender._id===$scope.authentication.user._id)
     	  //         $http.put('/users/deleteSubscriber/'+$scope.authentication.user._id,{id:$scope.thread.receiver._id}).success(function(){});                     
        //     else
        //           $http.put('/users/deleteSubscriber/'+$scope.authentication.user._id,{id:$scope.thread.sender._id}).success(function(){});                     
        //    });


        $scope.showOnline=function(data)
        {
             if(data.author.isOnline)
             	return true;
             else
             	return false;
        }
        $scope.showOffline=function(data)
        {
             if(data.author.isOnline)
             	return false;
             else
             	return true;
        }
		// Create new Thread
		$scope.create = function() {
			// Create new Thread object
			var thread = new Threads ({
				name: this.name
			});

			// Redirect after save
			thread.$save(function(response) {
				$location.path('threads/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Thread
		$scope.remove = function( thread ) {
			if ( thread ) { thread.$remove();

				for (var i in $scope.threads ) {
					if ($scope.threads [i] === thread ) {
						$scope.threads.splice(i, 1);
					}
				}
			} else {
				$scope.thread.$remove(function() {
					$location.path('threads');
				});
			}
		};
 


	$scope.sendMessage=function(){
             
             var threadId=$scope.thread._id;
             console.log("{Thread} {SendMessage} running"+" THREAD ID"+threadId);
          var message={threadId:$scope.thread._id,messageBody : $scope.messageBody,author:$scope.authentication.user};
           console.log("USER ID:"+$scope.authentication.user._id+' Sender ID'+$scope.thread.sender+' Receiver ID:'+$scope.thread.receiver);
//
      if($scope.authentication.user._id == $scope.thread.sender._id)
      {

      var thread = {
      	idc: threadId,
       sender : {displayName: $scope.authentication.user.displayName},
       receiver: $scope.thread.receiver_id,
       messages:[{created: Date.now()}]
       



      };
Socket.emit('message_sent_from', {message: thread});


      }
      else
      {

      var thread = {
      	idc: threadId,
       sender : {displayName: $scope.authentication.user.displayName},
       receiver: $scope.thread.sender._id,
       messages:[{created: Date.now()}]




      };
Socket.emit('message_sent_from', {message: thread});


      }
           $http.put('/threads/updateThread/' + $scope.thread._id,message).success(function(messageBody) {
                Socket.emit('update_threads', { sender : messageBody.sender,
	                                            receiver :messageBody.receiver,
 	                                            threadId: $scope.thread._id,
 	                                            messageBody: $scope.messageBody,
								                author: $scope.authentication.user,
								                authordp: $scope.authentication.user.picture_url,
								                created: Date.now()

                     });
            $scope.messageBody="";

             
             });

 		




		};
		// Update existing Thread
		$scope.update = function() {
			var thread = $scope.thread ;

			thread.$update(function() {
				$location.path('threads/' + thread._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Threads
		$scope.find = function() {
			$scope.threads = Threads.query();
		};

		// Find a list of Threads
		$scope.findUserThreads = function() {
			console.log("FINDUSERTHREADS RAN");
				$http.get('/threads/getUserThreads/' + $scope.authentication.user._id).success(function(threads) {
				$scope.threads = threads;

			});
		};

		



		// Find existing Thread
		$scope.findOne = function() {
			$scope.thread = Threads.get({ 
				threadId: $stateParams.threadId
			});
			Socket.emit('watched_thread','iraq');
	

		};

		//chatting html view aka view-thread.client.view.html
			$scope.findOneAndMarkAsRead = function() {
			//	socket.join('chatroom');
				
			    $http.get('/threads/getUserThread/' + $stateParams.threadId).success(function(thread) {
				    $scope.thread= thread;
				    console.log(thread.sender._id);
				    if(thread.sender._id===$scope.authentication.user._id)
				    
                      
                       $http.put('/users/addSubscriber/'+$scope.authentication.user._id,{id:thread.receiver._id}).success(function(){});                     
                

                    else
                       $http.put('/users/addSubscriber/'+$scope.authentication.user._id,{id:thread.sender._id}).success(function(){});                     
                   
				    
				   
				  
					Socket.emit('watched_thread',$scope.authentication.user._id);
             	});
			
		
	

		};
	}
]);
