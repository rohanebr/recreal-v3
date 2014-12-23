'use strict';

// Messages controller
angular.module('messages').controller('MessagesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Messages', '$http', 'Socket',
    function($scope, $stateParams, $location, Authentication, Messages, $http, Socket) {
        $scope.authentication = Authentication;
        $scope.threads = [];
        $scope.message = {};
        $scope.thread;
        $scope.balsamic = {};
        $scope.message.messages = [];
        $scope.displayNameOfReceiver;
        $scope.nomessages = false;
        $scope.unreadthreads = 0;
        console.log($stateParams.threadId);



        $scope.listThreads = function() {

            $http.get('/getAllMessagesWithFlagForUnread/' + $scope.authentication.user._id).success(function(res) {
                $scope.threads = res;
                console.log(res);
                for (var s = 0, len = $scope.threads.length; s < len; s++)
{
                
                   
if($scope.threads[s].receiver==$scope.authentication.user._id)
                if (!$scope.threads[s].readByReceiver)
                        $scope.unreadthreads++;

if($scope.threads[s].sender==$scope.authentication.user._id)
                if (!$scope.threads[s].readBySender)
                        $scope.unreadthreads++;
                }
                
                for (var s = 0, len = $scope.threads.length; s < len; s++)
                     if ($stateParams.threadId != "main" && $stateParams.threadId == $scope.threads[s]._id)
                       { $scope.selectedmessage($scope.threads[s]);
                        break;
                       }

                if ($stateParams.threadId == "main" && $scope.threads.length >= 1)
                    $scope.selectedmessage($scope.threads[0]);

                if ($stateParams.threadId == "main" && $scope.threads.length == 0)
                    $scope.nomessages = true;



            });



        };

        $scope.selectedmessage = function(message) {
            $scope.thread = message;
             $scope.displayNameOfReceiver="";
            $scope.messages = message.messages;

            console.log($scope.messages);
            for (var x = 0, len = $scope.messages.length; x < len; x++)
                if ($scope.messages[x].author._id != $scope.authentication.user._id) {
                    $scope.displayNameOfReceiver = $scope.messages[x].author.displayName;
                    break;

                }
           
            $scope.findOneAndMarkAsRead();
            $stateParams.threadId=$scope.thread._id;

        };
        // Create new Message
        $scope.create = function() {
            // Create new Message object
            var message = new Messages({
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
        $scope.remove = function(message) {
            if (message) {
                message.$remove();

                for (var i in $scope.messages) {
                    if ($scope.messages[i] === message) {
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
            var message = $scope.message;

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




        $scope.sendMessage = function() {


            var threadId = $scope.thread._id;

            var message = {
                threadId: $scope.thread._id,
                messageBody: $scope.balsamic.message,
                author: $scope.authentication.user
            };

            if ($scope.authentication.user._id == $scope.thread.sender._id) {

                var thread = {
                    idc: threadId,
                    sender: {
                        displayName: $scope.authentication.user.displayName
                    },
                    receiver: $scope.thread.receiver._id,
                    messages: {
                        created: Date.now()
                    }




                };
                Socket.emit('message_sent_from', {
                    message: thread
                });


            } else {

                var thread = {
                    idc: threadId,
                    sender: {
                        displayName: $scope.authentication.user.displayName
                    },
                    receiver: $scope.thread.sender._id,
                    messages: [{
                        created: Date.now()
                    }]




                };
                Socket.emit('message_sent_from', {
                    message: thread
                });


            }
            $http.put('/threads/updateThread/' + $scope.thread._id, message).success(function(messageBody) {
                console.log(messageBody);
                Socket.emit('update_threads', {
                    sender: messageBody.sender,
                    receiver: messageBody.receiver,
                    threadId: $scope.thread._id,
                    messageBody: $scope.balsamic.message,
                    author: $scope.authentication.user,
                    authordp: $scope.authentication.user.picture_url,
                    created: Date.now()

                });



            });




        };



        Socket.on("i_am_here", function(data) {

            for (var x = 0, b = $scope.thread.messages.length; x < b; x++) {
                if ($scope.thread.messages[x].author._id === data.userId)
                    $scope.thread.messages[x].author.isOnline = (data.isOnline == "Online" ? true : false);

                if ($scope.thread.messages[x].author.authorid == data.userId)
                    $scope.thread.messages[x].author.isOnline = (data.isOnline == "Online" ? true : false);


            }

        });

        //socket incoming_thread start
        Socket.on("incoming_thread", function(data) {
           
                $scope.balsamic.message = "";
                  $scope.newMessage = {
                messageBody: data.messageBody,
                author: {
                    _id: data.id,
                    displayName: data.author,
                    picture_url: data.authordp,
                    isOnline: "Online"
                },
                created: data.created
            };
$scope.unreadthreads++;
                    for(var x=0,len=$scope.threads.length;x<len;x++)
                    {
                       if($scope.threads[x]._id==data.threadId)
                          {
                           $scope.threads[x].messages.unshift($scope.newMessage);
                            break;
                          }



                    }
            

             
            





        });


        $scope.sortMessage = function(message) {
            var date = new Date(message.created);
            return date;
        };

        $scope.findOneAndMarkAsRead = function() {


            $http.put('/threads/getUserThread/' + $scope.thread._id, {
                id: $scope.authentication.user._id
            }).success(function(thread) {
                $scope.thread = thread.thread;
                if(!thread.alreadyRead && $scope.unreadthreads!=0)
                    $scope.unreadthreads--;

               
                if (thread.thread.sender._id === $scope.authentication.user._id)
                    $http.put('/users/addSubscriber/' + $scope.authentication.user._id, {
                        id: thread.thread.receiver._id
                    }).success(function() {});
                else
                    $http.put('/users/addSubscriber/' + $scope.authentication.user._id, {
                        id: thread.thread.sender._id
                    }).success(function() {});
                Socket.emit('watched_thread', $scope.authentication.user._id);
            });
        };



    }
]);