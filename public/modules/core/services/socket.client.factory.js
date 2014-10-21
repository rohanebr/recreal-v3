'use strict';

angular.module('core').factory('Socket', ['$rootScope','Authentication',
	function($rootScope,Authentication) {

   
//console.log(Authentication.user);
if(Authentication.user && !socket)
{
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