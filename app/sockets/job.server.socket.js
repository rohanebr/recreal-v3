'use strict'

var io = require('../../config/socket.js').socket_io;

exports.publishCreate = function(){
	
};


//This function is run for employer. When
//a candiate applies on a job employer gets notified
exports.applicationReceived = function(data){
    io.sockets.emit('applied_on_job', data);
};


//This function is run for the employee. When the job 
//is pushed candidate receives it
exports.jobPosted = function(data){
    io.sockets.emit('job_posted', data);
};