'use strict';

angular.module('core').factory('Socket', ['Authentication',
	function(Authentication) {
	var socket;
	    if(Authentication.user){
	       socket = io.connect('http://localhost:3000');
	    }

		return socket;
	}
]);