'use strict';

var sock;
var io;

exports.create = function(server){
	
    io = require('socket.io').listen(server);



	// Configure Socket.io connection
    io.on('connection', function(socket) {
        console.log('connected');

        sock = socket;


        socket.emit('entrance', {message: 'Wellcome to the chat room'});
        io.sockets.emit('exit', {message: 'A new chatter joined the room'});

        socket.on('disconnect', function(){
        	io.sockets.emit('exit', {message: 'A chatter just went offline'});
        });


        socket.on('applied_on_job', function(data) {
            io.sockets.emit('applied_on_job', data);
        });

         socket.on('message_sent', function(data) {
            io.sockets.emit('message_sent', data);
        });
    });
};


exports.socket_io = io;

