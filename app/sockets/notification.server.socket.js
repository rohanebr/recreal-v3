'use strict'

var io = require('../../config/socket.js').socket_io;
exports.notifyEmployerAboutNewCandidateApplication=function(data)
{
 io.sockets.emit('take_the_test_notification', data);


};