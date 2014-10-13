'use strict';

// Threads controller
angular.module('threads').controller('ThreadsController', ['$scope', '$stateParams','$location', 'Authentication', 'Threads', '$http','Socket',
	function($scope, $stateParams, $location, Authentication, Threads, $http,Socket ) {
		$scope.authentication = Authentication;
        //Incoming thread updates

        Socket.on("incoming_thread", function (data) {Threads.get({ 
				threadId: $stateParams.threadId
			});
        //Now i should call the header controller again 
        	console.log(data.messageBody+" "+data.author+" "+data.created);
$scope.thread.messages.push({messageBody:data.messageBody,
						author:{displayName:data.author,picture_url:data.authordp},
							created:data.created
							});
		
$scope.$digest();

	



        });
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
      if($scope.authentication.user._id == $scope.thread.sender)
      {

      var thread = {
      	idc: threadId,
       sender : {displayName: $scope.authentication.user.displayName},
       receiver: $scope.thread.receiver,
       messages:[{created: Date.now()}]
       



      };
Socket.emit('message_sent_from', {message: thread});


      }
      else
      {

      var thread = {
       sender : {displayName: $scope.authentication.user.displayName},
       receiver: $scope.thread.sender,
       messages:[{created: Date.now()}]




      };
Socket.emit('message_sent_from', {message: thread});


      }
           $http.put('/threads/updateThread/' + $scope.thread._id,message).success(function(messageBody) {


Socket.emit('update_threads', { sender : messageBody.sender,
	                            receiver :messageBody.receiver,
 	                            threadId:$scope.thread._id,
 	                            messageBody:$scope.messageBody,
								author: $scope.authentication.user,
								authordp: $scope.authentication.user.picture_url,
								created: Date.now()



 });		 $scope.messageBody="";

             
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
			$scope.findOneAndMarkAsRead = function() {
				console.log($stateParams.threadId);
				//Can change to get
						$http.get('/threads/getUserThread/' + $stateParams.threadId).success(function(thread) {
						 	 
                   $scope.thread= thread;
					Socket.emit('watched_thread',$scope.authentication.user._id);
       
				   
			});
			
		
	

		};
	}
]);
