'use strict';

angular.module('core').factory('Socket', ['$rootScope','Authentication','geolocation',
	function($rootScope,Authentication,geolocation) {

   
//console.log(Authentication.user);
if(Authentication.user && !socket)
{
  $rootScope.coords={lat:0,longi:0};
geolocation.getLocation().then(function(data){
      $rootScope.coords = {lat:data.coords.latitude, longi:data.coords.longitude};
     
    });
	var socket = io.connect('http://localhost:3000');
socket.emit("user_data",Authentication.user);
}

    return {
    
      on: function (eventName, callback) {
        socket.on(eventName, function () {  
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
      
    };
  }
]);