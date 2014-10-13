'use strict';

var sock;
var io;
var online_users = [];


exports.create = function(server){
    io = require('socket.io').listen(server);
    io.on('connection', function(socket) {

        console.log('connected'+socket.id);
        sock = socket;
       socket.on('update_threads',function(data)
        {
      var leastamountofdata={messageBody:data.messageBody,author:data.author.displayName,created:data.created,authordp : data.authordp };
            var socketid=fetchmesocketid(data.receiver);
            for(var x=0;x<socketid.length;x++)
          {socketid[x].emit('watched_thread','nothg');
            socketid[x].emit('incoming_thread', leastamountofdata);}
           var socketid=fetchmesocketid(data.sender);
            for(var x=0;x<socketid.length;x++)
           { socketid[x].emit('watched_thread','nothg');
            socketid[x].emit('incoming_thread', leastamountofdata);


        }
console.log(leastamountofdata);
              }  



                   );
        socket.emit('entrance', {message: 'Welcome to the chat room'});

        // registerPresence(socket);

        socket.on('user',function(data)
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
        });

        io.sockets.emit('entrance_response', {message: 'A new chatter joined the room'});

        socket.on('disconnect', function(){
            io.sockets.emit('exit', {message: 'A chatter just went offline'});
            console.log("Socket ID"+socket.id);
            for(var a=0 , b = online_users.length;a<b;a++){ 
                console.log("ITERATE SOCKETS"+online_users[a].socket.id);
                if(online_users[a].socket.id==socket.id){
                    console.log("SOCKET GOING BYE BYE"+online_users[a].user.displayName);
                    online_users.splice(online_users.indexOf(online_users[a]),1);
                    break;
                }
            }
        });

        socket.on('applied_on_job', function(data) {
            io.sockets.emit('applied_on_job', data);
        });
     socket.on('watched_thread',function(data)
{
console.log(data);
 var socketid=fetchmesocketid(data);
            for(var x=0;x<socketid.length;x++)
            socketid[x].emit('watched_thread_to', data);
  
    console.log("WATCHED THREAD");
}

        );
        socket.on('message_sent_from', function(data) {
            console.log(data);
            var socketid=fetchmesocketid(data.message.receiver);
            for(var x=0;x<socketid.length;x++)
            socketid[x].emit('message_sent_to', data);
        });

    });
};


// // Socket API for saving a vote
// registerPresence = function(socket) {
//   socket.on('register:user', function(data) {
//     var ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address.address;    
//     Poll.findById(data.poll_id, function(err, poll) {
//       var choice = poll.choices.id(data.choice);
//       choice.votes.push({ ip: ip });      
//       poll.save(function(err, doc) {
//         var theDoc = { 
//           question: doc.question, _id: doc._id, choices: doc.choices, 
//           userVoted: false, totalVotes: 0 
//         };
//         for(var i = 0, ln = doc.choices.length; i < ln; i++) {
//           var choice = doc.choices[i]; 
//           for(var j = 0, jLn = choice.votes.length; j < jLn; j++) {
//             var vote = choice.votes[j];
//             theDoc.totalVotes++;
//             theDoc.ip = ip;
//             if(vote.ip === ip) {
//               theDoc.userVoted = true;
//               theDoc.userChoice = { _id: choice._id, text: choice.text };
//             }
//           }
//         }       
//         socket.emit('myvote', theDoc);
//         socket.broadcast.emit('vote', theDoc);
//       });     
//     });
//   });
// };

exports.socket_io = io;

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

