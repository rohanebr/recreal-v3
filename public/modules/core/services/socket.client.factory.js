'use strict';

angular.module('core').factory('Socket', [
	function() {
        var socket = io.connect('http://muddaser-pc:3000');
		return socket;
	}
]);