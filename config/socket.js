'use strict';

var sock;
var io;
var online_users = [];
function fetchmesocketid(data)
{
var usersocketbind=[];   //single user can have multiple sockets
 for (var x=0, b=online_users.length;x<b;x++) {

        if (online_users[x].user._id==data) {
         console.log("FETCHMESOCKETID:"+data+"WTF"+online_users[x].user.displayName);

            usersocketbind.push(online_users[x].socket);
        }
    }
    return usersocketbind;

}
function containsObject(socket) {

    console.log("FUNCT");
    for (var x=0, b=online_users.length;x<b;x++) {

        if (online_users[x].socket.id===socket) {
            return true;
        }
    }

    return false;
}

exports.create = function(server){
    io = require('socket.io').listen(server);
    io.on('connection', function(socket) {
    console.log('connected'+socket.id);
    sock = socket;
    socket.emit('entrance', {message: 'Welcome to the chat room'});
    socket.on('user_data',function(data)
    {

        var online_user = {
            user: data,
            socket: socket
        };

   if(!containsObject(socket.id)){
 console.log("WAS CALLED");
   online_users.push(online_user);
   }

       for(var a=0 , b = online_users.length;a<b;a++)


console.log(online_users[a].user.displayName+" "+online_users[a].socket.id);


    }
    );
    io.sockets.emit('entrance_response', {message: 'A new chatter joined the room'});
    socket.on('disconnect', function(){


    io.sockets.emit('exit', {message: 'A chatter just went offline'});
    console.log("Socket ID"+socket.id);

       for(var a=0 , b = online_users.length;a<b;a++)
    { console.log("ITERATE SOCKETS"+online_users[a].socket.id);
         if(online_users[a].socket.id==socket.id)
                {

                   console.log("SOCKET GOING BYE BYE"+online_users[a].user.displayName);
                    online_users.splice(online_users.indexOf(online_users[a]),1);
                    break;
                  }}
      //console.log(online_users);




        });
        socket.on('applied_on_job', function(data) {
            io.sockets.emit('applied_on_job', data);
        });

         socket.on('message_sent_from', function(data) {
         var socketid=fetchmesocketid(data.message.recieverId);



       for(var x=0;x<socketid.length;x++)
        socketid[x].emit('message_sent_to', data);


        });
    });
};


exports.socket_io = io;

