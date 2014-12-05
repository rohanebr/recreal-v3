'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', 'Socket', '$http','$location','$rootScope', 'toaster',
    function($scope, Authentication, Menus, Socket, $http,$location,$rootScope, toaster) {
        $scope.authentication = Authentication;
        $scope.isCollapsed = false;
        $scope.menu = Menus.getMenu('topbar');
        $scope.threads = [];
        $scope.unreadnotificationslength=0;
        $scope.user=$scope.authentication.user;
        $scope.notifications = [];
        var thread = [];



       $scope.list =' ';
      $scope.texts = ' ';
      $scope.submit = function() {
        if ($scope.texts) {
          $scope.list=this.texts;
          $rootScope=$scope.list;
          $scope.texts = ' ';
          $location.path('/search-jobs/'+$scope.list);
        }
      };
      $scope.findMeAJob=function()
      {

      $location.path('/search-jobs/find-me-a-job');
      };

$scope.notificationRead=function(data){
 
              

                $http.post('/users/readNotification/' + $scope.authentication.user._id,data).success(function(res) {
                  if(res.outgoing=="not-read")
                    $scope.unreadnotificationslength--;
                    for (var i in $scope.notifications ) {
                    if ($scope.notifications [i] === data  && $scope.notifications.length>10) {
                        $scope.notifications.splice(i, 1);
                    }
                }
                   
                    $scope.apply();
                }).error(function(data, status, headers, confige) {

                 
                });

        		
        	}
     
        if ($scope.authentication.user) {
 $scope.isCandidate=function()
      {

       if( $scope.authentication.user.userType==='candidate')
        return true;

else return false;
      };

        	var count=0;
        	var y=$scope.authentication.user.notifications.length;
                  for(var x=0;x<y;x++)
                   if(!($scope.authentication.user.notifications[x].isRead))
                    	{
                    		$scope.notifications=$scope.authentication.user.notifications[x];
                    		count++;
                    	}
                        $scope.unreadnotificationslength=count--;
            
              if(count<10 && y>=10)
              {var x=0;
                   while(count<10)
                   {
                   	if($scope.authentication.user.notifications[x].isRead)
                   $scope.notifications=$scope.authentication.user.notifications[x];
                     count++;
                      x++;

                   }

              }

                  
        	$scope.notifications=$scope.authentication.user.notifications;
            Socket.on('take_the_test_notification', function(data) {
                console.log("GOT A HIT");
                if (data.userid == $scope.authentication.user._id)
                {
                 var present=false;

                        for(var d=0,len=$scope.notifications.length;d<len;d++)
                        {
                            if($scope.notifications[d]._id==data.notification._id)
                              {  present=true;break;}

                        }
                        if(!present){
                    $scope.notifications.push(data.notification);
                     $scope.unreadnotificationslength++;}
                }

            });
            Socket.on('watched_thread_to', function(event, args) {
                $scope.threads = [];
                console.log("wactched_thread_to works");



                $http.get('/users/getMessages/' + $scope.authentication.user._id).success(function(res) {


                    if (res.length > 1) {
                        for (var x = 1; x < res.length; x++)
                            $scope.threads.push(res[x]);

                    }



                }).error(function(data, status, headers, confige) {

                    console.log("Shouldnt have happened");
                });


            });




            $http.get('/users/getMessages/' + $scope.authentication.user._id).success(function(res) {
            
               
                if (res.length > 1) {
                    for (var x = 1; x < res.length; x++)
                        $scope.threads.push(res[x]);

                }

            }).error(function(data, status, headers, confige) {

                console.log("Shouldnt have happened");
            });



            Socket.on('message_sent_to', function(data) {


                if (data.message.receiver === $scope.authentication.user._id) {
                    var alreadyexists = false;
                    console.log(data);

                    var thread = {
                        id: data.message.idc,
                        senderName: data.message.sender.displayName,
                        created: data.message.messages.created,
                        count: 1

                    }
                    for (var d = 0, h = $scope.threads.length; d < h; d++) {
                        if ($scope.threads[d].id == thread.id) {
                            $scope.threads[d].count++;
                            alreadyexists = true;
                            break;
                        }
                    }
                    if (!alreadyexists) {
                        $scope.threads.push(thread);
                        $scope.$apply();
                        toaster.pop('success', "Message recieved", data.message.sender.displayName);
                    }
                }


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