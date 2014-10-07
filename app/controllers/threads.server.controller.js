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
	  }).populate('sender').exec(function(err, threads){
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
exports.threadByID = function(req, res, next, id) { Thread.findById(id).populate('user', 'displayName').exec(function(err, thread) {
		if (err) return next(err);
		if (! thread) return next(new Error('Failed to load Thread ' + id));
		req.thread = thread ;
		next();
	});
};

/**
 * Thread authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.thread.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};