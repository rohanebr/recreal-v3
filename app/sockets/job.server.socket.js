'use strict'

var io = require('../../config/socket.js').socket_io;

exports.publishCreate = function(){
	
};

exports.applicationReceived = function(data){
    io.sockets.emit('applied_on_job', data);
};