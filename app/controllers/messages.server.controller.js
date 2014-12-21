var mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	Candidate = mongoose.model('Candidate'),
	Employer = mongoose.model('Employer'),
	Company = mongoose.model('Company'),
	Threads = mongoose.model('Thread'), 
	_ = require('lodash'),
	mongoose = require('mongoose'),
	
	User = mongoose.model('User'),
	config = require('../../config/config'),
	nodemailer = require('nodemailer'),
	async = require('async'),
	crypto = require('crypto');


	exports.getMessagesWithFlagForNewMessages= function (req,res)
	{

    var userId=req.user._id;
	var threadsId=req.user.threads;

var threadId;



	Threads.find({'_id': { $in: threadsId}})
       .populate('messages.author').sort('readByReceiver')
       .exec(function(err, docs){
        console.log(docs);
     res.jsonp(docs);






       });




	};



