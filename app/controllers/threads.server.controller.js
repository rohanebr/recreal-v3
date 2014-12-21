'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Thread = mongoose.model('Thread'),
	User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Thread already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Thread
 */

exports.create = function(req, res) {
	var thread = new Thread(req.body);

	thread.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			User.update(
		      { _id: thread.sender },
		      { $push: { threads : thread._id } },
		      { safe: true },
		      function removeConnectionsCB(err, obj) {

		    });
		    User.update(
		      { _id: thread.receiver },
		      { $push: { threads : thread._id } },
		      { safe: true },
		      function removeConnectionsCB(err, obj) {

		    });
			res.jsonp(thread);
		}
	});
};

/**
 * Show the current Thread
 */
exports.read = function(req, res) {
	res.jsonp(req.thread);
};

/**
 * Update a Thread
 */
exports.update = function(req, res) {
	var thread = req.thread ;

	thread = _.extend(thread , req.body);

	thread.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(thread);
		}
	});
};

/**
 * Delete an Thread
 */
exports.delete = function(req, res) {
	var thread = req.thread ;

	thread.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(thread);
		}
	});
};

/**
 * List of Threads
 */
exports.list = function(req, res) { Thread.find().sort('-created').populate('user', 'displayName').exec(function(err, threads) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(threads);
		}
	});
};

/**
 * List of Threads


 // new
Model.find().populate({
    path: 'friends author'        // either single path or multiple space delimited paths
  , select: 'name age'            // optional
  , model: 'ModelName'            // optional
  , match: { age: { $gte: 18 }}   // optional
  , options: { sort: { age: -1 }} // optional
})


 */
 
exports.getUserThreads = function(req, res) { 

	// User.find({_id: req.user._id}).populate({path: 'sender threads'}).exec(function(err, users) {
	// 	if (err) {
	// 		return res.send(400, {
	// 			message: getErrorMessage(err)
	// 		});
	// 	} else {
	// 		res.jsonp(users[0]);
	// 	}
	// });//
// 
	Thread.find({
	      $or: [
	          {sender: req.user._id},
	          {receiver: req.user._id}
	      ]
	  }).populate('sender').populate('receiver').exec(function(err, threads){
	  	if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(threads);
		}
	  });

};

/**
 * Thread middleware
 */


exports.threadByID = function(req, res, next, id) { 

console.log("{THREAD}{CONTROLLER}{THREADBYID}");
	Thread.findById(id).populate('messages.author').exec(function(err, thread) {
		//thread.read=true;

       // thread.markModified('read');
       //  thread.save();
		if (err) return next(err);
		if (! thread) return next(new Error('Failed to load Thread ' + id));
		req.thread = thread ;
		next();


	});
};


// exports.updateThread = function (req,res)
// {
// var threadId=req.thread._id;

// console.log(threadId);
// var message=req.body.messageBody;

// console.log("{Threads}{Controller} ran");


//  Thread.update(
//        { _id: threadId },
//        { $push: { messages : {messageBody:message} } },
//       { safe: true },
//        function (err, obj) {
// if (err) {
// 			return res.send(400, {
// 				message: getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(message);
// 		}
//        });


// }
/**
*Get A single user thread and mark it as Read
*/
exports.setRead = function(req,res)

{
}
exports.getUserThread = function(req,res)
{
	var alreadyRead=false;
	var idofuser=req.body.id;
     	var id=req.thread._id;
 		Thread.findById(id).populate('sender').populate('receiver').populate('messages.author').exec(function(err, thread) {
 			if(thread.readBySender && thread.readByReceiver)
 				alreadyRead=true;
	if(thread.sender._id==idofuser)
		 {
		 	thread.readBySender=true;
            thread.markModified('readBySender');
		 }
		else
			if(thread.receiver._id==idofuser)
				{
					thread.readByReceiver=true;
					thread.markModified('readByReceiver');
				}
        thread.save(function(err){

        	if (err) return res.send(err);
		else
			return res.send({thread:thread,alreadyRead:alreadyRead});
        });
		
	});
}

/**
 * Thread authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.thread.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};
/*
*  This function only updates specific
*  parts of the thread plus sends only ids of 
*  sender and receiver which is optimum for really really big threads
*/

exports.updateThread = function (req,res)
{
var threadId=req.body.threadId;
var message=req.body.messageBody;
var author=req.body.author;
Thread.findById(threadId).populate('messages.author').exec(function(err, thread) {
		
        thread.messages.push({messageBody:message,author:author._id});
     
        thread.markModified('messages');
        thread.markModified('author');
        if(author._id==thread.sender)
        { thread.readByReceiver=false;
        	 thread.markModified('readByReceiver');
        }
        else

        {

        	 thread.readBySender=false;
        	  thread.markModified('readBySender');
        }
          
        
        
         thread.save(function(err){

   if(!err)

	{console.log("THREAD SAVED:"+thread);
		res.json( {'sender':thread.sender,'receiver':thread.receiver});}

         });
	
	
	});




};
