'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	Candidate = mongoose.model('Candidate'),
	Employer = mongoose.model('Employer'),
	Company = mongoose.model('Company'),
	Threads = mongoose.model('Thread'),
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
				message = 'Username already exists';
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
 * Signup
 */
exports.signup = function(req, res) {
	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	// Init Variables
	var user = new User(req.body);
	var message = null;

	// Add missing user fields
	user.provider = 'local';
	user.displayName = user.firstName + ' ' + user.lastName;
	var typeObject;

	switch(req.body.userType){
		case 'candidate':
			typeObject = new Candidate();
			user.candidate = typeObject;
			break;
		case 'employer':
			typeObject = new Employer();
			user.employer = typeObject;
			var company = new Company();
			typeObject.company = company;
			company.employers.push(typeObject);
			company.save();
			break;
	}
	typeObject.firstName = user.firstName;
	typeObject.lastName = user.lastName;
	typeObject.displayName = user.displayName;
	typeObject.user = user;
	typeObject.save();



	// Then save the user 
	user.save(function(err) {
		if (err) {
			typeObject.remove();
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.send(400, err);
				} else {
					res.jsonp(user);
				}
			});
		}
	});
};


/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.send(400, info);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

	
			req.login(user, function(err) {
				if (err) {
					res.send(400, err);
				} else {
					res.jsonp(user);
				}
			});
		}
	})(req, res, next);
};

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				return res.send(400, {
					message: getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.send(400, err);
					} else {
						res.jsonp(user);
					}
				});
			}
		});
	} else {
		res.send(400, {
			message: 'User is not signed in'
		});
	}
};

/**
 * Change Password
 */
exports.changePassword = function(req, res, next) {
	// Init Variables
	var passwordDetails = req.body;
	var message = null;

	if (req.user) {
		User.findById(req.user.id, function(err, user) {
			if (!err && user) {
				if (user.authenticate(passwordDetails.currentPassword)) {
					if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
						user.password = passwordDetails.newPassword;
						user.save(function(err) {
							if (err) {
								return res.send(400, {
									message: getErrorMessage(err)
								});
							} else {
								req.login(user, function(err) {
									if (err) {
										res.send(400, err);
									} else {
										res.send({
											message: 'Password changed successfully'
										});
									}
								});
							}
						});
					} else {
						res.send(400, {
							message: 'Passwords do not match'
						});
					}
				} else {
					res.send(400, {
						message: 'Current password is incorrect'
					});
				}
			} else {
				res.send(400, {
					message: 'User is not found'
				});
			}
		});
	} else {
		res.send(400, {
			message: 'User is not signed in'
		});
	}
};

/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.jsonp(req.user || null);
};

/**
 * OAuth callback
 */
exports.oauthCallback = function(strategy) {
	console.log('oauthCallback');
	return function(req, res, next) {
		passport.authenticate(strategy, function(err, user, redirectURL) {
			if (err || !user) {
				return res.redirect('/#!/signin');
			}
			req.login(user, function(err) {
				if (err) {
					return res.redirect('/#!/signin');
				}

				return res.redirect(redirectURL || '/');
			});
		})(req, res, next);
	};
};

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findOne({
		_id: id
	}).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + id));
		req.profile = user;
		next();
	});
};

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.send(401, {
			message: 'User is not logged in'
		});
	}

	next();
};


/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
	var _this = this;

	return function(req, res, next) {
		_this.requiresLogin(req, res, function() {
			if (_.intersection(req.user.roles, roles).length) {
				return next();
			} else {
				return res.send(403, {
					message: 'User is not authorized'
				});
			}
		});
	};
};

/**
 * Helper function to save or update a OAuth user profile
 */
exports.saveOAuthUserProfile = function(req, providerUserProfile, done) {
	if (!req.user) {
		// Define a search query fields
		var searchMainProviderIdentifierField = 'providerData.' + providerUserProfile.providerIdentifierField;
		var searchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' + providerUserProfile.providerIdentifierField;

		// Define main provider search query
		var mainProviderSearchQuery = {};
		mainProviderSearchQuery.provider = providerUserProfile.provider;
		mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

		// Define additional provider search query
		var additionalProviderSearchQuery = {};
		additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

		// Define a search query to find existing user with current provider profile
		var searchQuery = {
			$or: [mainProviderSearchQuery, additionalProviderSearchQuery]
		};

		User.findOne(searchQuery, function(err, user) {
			if (err) {
				return done(err);
			} else {
				if (!user) {
					var possibleUsername = providerUserProfile.username || ((providerUserProfile.email) ? providerUserProfile.email.split('@')[0] : '');

					User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
						user = new User({
							firstName: providerUserProfile.firstName,
							lastName: providerUserProfile.lastName,
							username: availableUsername,
							displayName: providerUserProfile.displayName,
							email: providerUserProfile.email,
							provider: providerUserProfile.provider,
							providerData: providerUserProfile.providerData,
							userType: 'transition'
						});

						// And save the user
						user.save(function(err) {
							return done(err, user);
						});
					});
				} else {
					return done(err, user);
				}
			}
		});
	} else {
		// User is already logged in, join the provider data to the existing user
		var user = req.user;

		// Check if user exists, is not signed in using this provider, and doesn't have that provider data already configured
		if (user.provider !== providerUserProfile.provider && (!user.additionalProvidersData || !user.additionalProvidersData[providerUserProfile.provider])) {
			// Add the provider data to the additional provider data field
			if (!user.additionalProvidersData) user.additionalProvidersData = {};
			user.additionalProvidersData[providerUserProfile.provider] = providerUserProfile.providerData;

			// Then tell mongoose that we've updated the additionalProvidersData field
			user.markModified('additionalProvidersData');

			// And save the user
			user.save(function(err) {
				return done(err, user, '/#!/settings/accounts');
			});
		} else {
			return done(new Error('User is already connected using this provider'), user);
		}
	}
};

// exports.getthread = function(req, res) {
// 	user.findOne({_id: req.usser._id}).populate('thread').populate('thread.message').exec(function(err, user){
// 		res.jsonp(user);
// 	});
// };
exports.getMessages = function(req,res)
{
	var userId=req.user._id;
	
	var username= User.findOne({_id:userId}).exec(function(err,user){






});
	var threadsId=req.user.threads;
console.log('{users}{controller}{getName} Ran USERIDE:'+' df');
var threadId;



	Threads.find({
    '_id': { $in: threadsId}
}).populate('messages.author').exec(function(err, docs){//res.setHeader('Content-Type', 'application/json');
	
	var gotmessages=[{}];
 		  for(var x=0;x<docs.length;x++)
 		  {
 		  	
            var lengths=docs[x].messages.length;
 		  if(!docs[x].read && !userId.equals(docs[x].messages[lengths-1].author._id))
 		  	  {var sendername=docs[x].messages[lengths-1].author.displayName;
 		  	  	var messagebody= docs[x].messages[lengths-1].messageBody;
 		  	  	var created=docs[x].messages[lengths-1].created;
 		  	  	var attr={id: docs[x]._id,senderName : sendername,messageBody:messagebody,created:created};
 		  	  	gotmessages.push(attr);

 		  	  }
 	}
 	
 	  
 	if(gotmessages.length>=0)
 	{
 		
    res.end(JSON.stringify(gotmessages));
    return "ended"; 	}
 		// res.send(JSON.stringify(gotmessages), null, 2);
 	else
 		{res.json("nothing");
 	return "ended";}
 
 
 
 	
 		});




};

exports.sendMessage = function(req, res, next) {



	var user = req.user;
	var recieverId = req.body.recieverId; // reciever is a user
	var subject= req.body.subject;
	var messageBody= req.body.messageBody;

	// User.findOne({_id: userId}).exec(function(err, user){
	// 	Candidate.findOne({_id: candidateId}).exec(function(err, candidate){
	// 		Subject.findOne({subject: subject}).exec(function(err, subject){
	// 			Message.findOne({message: message.text}){
	// 			user.sendMessage(candidate,subject,message.text);
	// 			res.jsonp(user);});
	// 		});
	// 	});
	// });


	if (req.user) {
		User.findById(req.user.id, function(err, sender) {
			User.findById(recieverId, function(err, reciever){
				var thread = {
					sender: sender._id,
					reciever: recieverId,
					subject: subject,
					senderName: sender.displayName,
					messages: []
				};

				var message = {
					messageBody: messageBody
				};

				thread.messages.push(message);

				sender.threads.push(thread);
				reciever.threads.push(thread);

				sender.save(function(err) {
					if (err) {
						return res.send(400, {
							message: getErrorMessage(err)
						});
					} else {
						res.send({
							message: 'Message sent successfully'
						});
					}
				});

				reciever.save(function(err) {
					if (err) {
						return res.send(400, {
							message: getErrorMessage(err)
						});
					} else {
						res.send({
							message: 'Message sent successfully'
						});
					}
				});
			});

			
		});
	}
		

};

exports.deleteSubscriber =function(req,res)
{

User.update(
      { _id: req.body.id },
      { $pull: { subscribers : req.user._id } },
      { safe: true },
      function removeConnectionsCB(err, obj) {
 
      });


}




exports.addSubscriber = function(req,res)
{
	var addsubscriber=true;
	
	User.findById(req.body.id, function(err, user)

		{
			for(var x=0,b=user.subscribers.length;x<b;x++)
			{console.log(user.subscribers[x]);
         
				if(user.subscribers[x].equals(req.user._id))
                       {  addsubscriber=false;
                       	break;
                       }
			}

              
if(addsubscriber)
User.update(
      { _id: req.body.id },
      { $push: { subscribers : req.user._id } },
      { safe: true },
      function removeConnectionsCB(err, obj) {

      });

		});



};


/**
 * Remove OAuth provider
 */
exports.removeOAuthProvider = function(req, res, next) {
	var user = req.user;
	var provider = req.param('provider');

	if (user && provider) {
		// Delete the additional provider
		if (user.additionalProvidersData[provider]) {
			delete user.additionalProvidersData[provider];

			// Then tell mongoose that we've updated the additionalProvidersData field
			user.markModified('additionalProvidersData');
		}

		user.save(function(err) {
			if (err) {
				return res.send(400, {
					message: getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.send(400, err);
					} else {
						res.jsonp(user);
					}
				});
			}
		});
	}
};




