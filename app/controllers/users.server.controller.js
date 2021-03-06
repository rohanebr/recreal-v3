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
	_ = require('lodash'),
	mongoose = require('mongoose'),
	
	User = mongoose.model('User'),
	config = require('../../config/config'),
	nodemailer = require('nodemailer'),
	async = require('async'),
	crypto = require('crypto'),
	Distance =require('../helpers/matrix.server.helper.js');

	// var config = require('../config');

	// var LinkedInStrategy = require('passport-linkedin').Strategy,
	// passport = require('passport');

	var Linkedin = require('node-linkedin')(config.linkedin.clientID, config.linkedin.clientSecret, config.linkedin.callbackURL);





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
			company.user = user;
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
	

			res.jsonp({status: true});


		}
	});
};

exports.readNotification=function(req,res)


{
	var g=req.body;
	var status='';
	var id = mongoose.Types.ObjectId(g._id);
	   User.findById(req.user.id,function(err,user){
var len=user.notifications.length;
            for(var g=0;g<len;g++)
            {
               if(id.equals(user.notifications[g]._id))
               {
               if(user.notifications[g].isRead)
               {
                status="read";
               }
                else
               	{user.notifications[g].isRead=true;
               		status="not-read";

               	}
           }


            }

            user.markModified('notifications');
            user.save();

res.jsonp({outgoing:status});

	   });
// 	var notification=req.user.notifications[0];
	
// 	console.log(id);
// 	if(id.equals(notification._id))
// console.log(notification._id.id);


};
/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.send(400, info);
		} else {
			// // Remove sensitive data before login
			// user.password = undefined;
			// user.salt = undefined;

	
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
exports.setUserType = function (req,res)
{
console.log(req.body.userType);
console.log(req.user._id);
User.findById(req.user.id, function(err, user) {
user.userType=req.body.userType;
        user.markModified('userType');
       
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

	    typeObject.save(function (err, typeObject) {
		  if (err) return res.send(err);
				else{
					user.save(function (err, user) {
					  if (err) return res.send(err);
							else
								return res.send(user);
					});
				}
		});
        
		



});


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
						var typeObject = new Candidate(
							// {
 						// 	title:          ,
 						// 	displayName: providerUserProfile.displayName,

							// }		

							);

			     		user = new User({
							firstName: providerUserProfile.firstName,
							lastName: providerUserProfile.lastName,
							username: availableUsername,
							displayName: providerUserProfile.displayName,
							email: providerUserProfile.email,
							provider: providerUserProfile.provider,
							picture_url:providerUserProfile.providerData.pictureUrl,
							providerData: providerUserProfile.providerData,
							isOnline:'Online',
							
							candidate:typeObject,
							userType: 'transition'
						});
						typeObject.firstName = user.firstName;
	    				typeObject.lastName = user.lastName;
	    				typeObject.displayName = user.displayName;
	    				typeObject.user = user;
	    				if(providerUserProfile.providerData.location)
	    				typeObject.country=providerUserProfile.providerData.location.name;
	    			console.log()
 						if(providerUserProfile.providerData.skills.values.length!=0)
 						{ var linkskills=providerUserProfile.providerData.skills.values;
 							for(var s=0;s<linkskills.length;s++)
 								  {
                               typeObject.skills.push({title:linkskills[s].skill.name,level:"Intermidiate",experience:2,last_used:Date.now()});
 								  }
 						}

 						if(providerUserProfile.providerData.educations.values!=0)
 							 {
 							 	var edu=providerUserProfile.providerData.educations.values;
 							 	for(var s=0;s<edu.length;s++)
 							 			typeObject.educations.push({degree:edu[s].degree,study_feild:edu[s].fieldOfStudy?edu[s].fieldOfStudy:"none",start_date:new Date(edu[s].startDate.year),end_date:new Date(edu[s].endDate.year),institute:edu[s].schoolName,notes:edu[s].notes?edu[s].notes:""});
 							 	
 							 }
 					    if(providerUserProfile.providerData.positions.values!=0)
 					    {
 					    	var pos=providerUserProfile.providerData.positions.values;
 					    	for(var s=0;s<pos.length;s++)
 					    	{
 					    		typeObject.positions.push({company_name:pos[s].company.name,title:pos[s].title,summary:pos[s].summary?pos[s].summary:"",start_date:pos[s].startDate.year,end_date:pos[s].endDate?pos[s].endDate.year:"",is_current:pos[s].endDate?false:true});
 					    	}
 					    }
 					    if(providerUserProfile.providerData.languages.values!=0)
 					    {
 					    	var lang=	providerUserProfile.providerData.languages.values;
 					    	for(var s=0;s<lang.length;s++)
 					    	 typeObject.languages.push({name:lang[s].language.name,proficiency:"Professional Working"});

 					    }
	    				typeObject.title=providerUserProfile.providerData.headline;
	    				if(providerUserProfile.providerData.pictureUrl)
	    				typeObject.picture_url=providerUserProfile.providerData.pictureUrl;
	    				if(providerUserProfile.providerData.summary)
	    					typeObject.objective=providerUserProfile.providerData.summary;
	    				else
	    					typeObject.objective="You have no Objectives in Linkedin Profile";
                        
                        typeObject.save(function(err){
                        	// And save the user
						user.save(function(err) {
							return done(err, user);
						});		

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
	
	Distance.calculate("SDF","SFd");
	var userId=req.user._id;
	var threadsId=req.user.threads;

var threadId;



	Threads.find({
    '_id': { $in: threadsId}
}).populate('messages.author').exec(function(err, docs){//res.setHeader('Content-Type', 'application/json');
	
	var gotmessages=[{}];
 		  for(var x=0;x<docs.length;x++)
 		  {
 		  	var isRead=false;
 		  	if(docs[x].sender!=null && docs[x].sender.equals(userId))
 		  	{
                if(docs[x].readBySender==true)
                	isRead=true;

 		  	}	
 		  	else
 		  	if(docs[x].receiver.equals(userId))
 		  	{
                if(docs[x].readByReceiver==true)
                	isRead=true;

 		  	}	  	
            var lengths=docs[x].messages.length;
       if(!docs[x].messages[lengths-1].author)
       {
       

 		  	  	var messagebody= docs[x].messages[lengths-1].messageBody;
 		  	  	var created=docs[x].messages[lengths-1].created;
 		  	  	var attr={id: docs[x]._id,messageBody:messagebody,created:created};
 		  	  	gotmessages.push(attr);
       }
   else{
 		  if(!isRead && !userId.equals(docs[x].messages[lengths-1].author._id))
 		  	  {
 		  	  	var sendername=docs[x].messages[lengths-1].author.displayName;
 		  	  	var messagebody= docs[x].messages[lengths-1].messageBody;
 		  	  	var created=docs[x].messages[lengths-1].created;
 		  	  	var attr={id: docs[x]._id,senderName : sendername,messageBody:messagebody,created:created};
 		  	  	gotmessages.push(attr);

 		  	  }}
 	}
 	
 	  
 	if(gotmessages.length>=0)
 	{
 		console.log(gotmessages);
    res.end(JSON.stringify(gotmessages));

   	}
 		
 	else
 		res.json("nothing");
 	
 
 
 
 	
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
{console.log("ADDSUBSCRIBER");
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
         res.jsonp("Subscriber Added");
      });


res.jsonp("Already present");

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




// module.exports = _.extend(
// 	require('./users/users.password')
// );

exports.forgot = function(req, res, next) {
	console.log("RAN FORGET");
		async.waterfall([
		// Generate random token
		function(done) {
			crypto.randomBytes(20, function(err, buffer) {
				var token = buffer.toString('hex');
				done(err, token);
			});
		},
		// Lookup user by username
		function(token, done) {
			if (req.body.username) {
				User.findOne({
					username: req.body.username
				}, '-salt -password', function(err, user) {
					if (!user) {
						return res.status(400).send({
							message: 'No account with that username has been found'
						});
					} else if (user.provider !== 'local') {
						return res.status(400).send({
							message: 'It seems like you signed up using your ' + user.provider + ' account'
						});
					} else {
						user.resetPasswordToken = token;
						user.resetPasswordExpires = Date.now() + 36000000; // 1 hour

						user.save(function(err) {
							done(err, token, user);
						});
					}
				});
			} else {
				return res.status(400).send({
					message: 'Username field must not be blank'
				});
			}
		},
		function(token, user, done) {
			res.render('templates/reset-password-email', {
				name: user.displayName,
				appName: config.app.title,
				url: 'http://' + req.headers.host + '/auth/reset/' + token
			}, function(err, emailHTML) {
				done(err, emailHTML, user);
			});
		},
		// If valid email, send reset email using service
		function(emailHTML, user, done) {
			var smtpTransport = nodemailer.createTransport(config.mailer.options);
			var mailOptions = {
				to: user.email,
				from: config.mailer.from,
				subject: 'Password Reset',
				html: emailHTML
			};
			smtpTransport.sendMail(mailOptions, function(err) {
				if (!err) {
					res.send({
						message: 'An email has been sent to ' + user.email + ' with further instructions.'
					});
				}

				done(err);
			});
		}
	], function(err) {
		if (err) return next(err);
	});
};

/**
 * Reset password GET from email token
 */
exports.validateResetToken = function(req, res) {
	User.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires: {
			$gt: Date.now()
		}
	}, function(err, user) {
		if (!user) {
			return res.redirect('/#!/password/reset/invalid');
		}

		res.redirect('/#!/password/reset/' + req.params.token);
	});
};

/**
 * Reset password POST from email token
 */
exports.reset = function(req, res, next) {
	// Init Variables
	var passwordDetails = req.body;
console.log("reset");
	async.waterfall([

		function(done) {
			User.findOne({
				resetPasswordToken: req.params.token,
				resetPasswordExpires: {
					$gt: Date.now()
				}
			}, function(err, user) {
				if (!err && user) {
					console.log(user);
					if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
						user.password = user.hashPassword(passwordDetails.newPassword);
						user.resetPasswordToken = undefined;
						user.resetPasswordExpires = undefined;

						user.save(function(err) {
							if (err) {
								return res.status(400).send({
									message: errorHandler.getErrorMessage(err)
								});
							} else {
								req.login(user, function(err) {
									if (err) {
										res.status(400).send(err);
									} else {
										// Return authenticated user 
										res.jsonp(user);

										done(err, user);
									}
								});
							}
						});
					} else {
						return res.status(400).send({
							message: 'Passwords do not match'
						});
					}
				} else {
					return res.status(400).send({
						message: 'Password reset token is invalid or has expired.'
					});
				}
			});
		},
		function(user, done) {
			res.render('templates/reset-password-confirm-email', {
				name: user.displayName,
				appName: config.app.title
			}, function(err, emailHTML) {
				done(err, emailHTML, user);
			});
		},
		// If valid email, send reset email using service
		function(emailHTML, user, done) {
			var smtpTransport = nodemailer.createTransport(config.mailer.options);
			var mailOptions = {
				to: user.email,
				from: config.mailer.from,
				subject: 'Your password has been changed',
				html: emailHTML
			};
			
			smtpTransport.sendMail(mailOptions, function(err) {
				done(err, 'done');
			});
		}
	], function(err) {
		if (err) return next(err);
	});
};

/**
 * Change Password
 */
exports.changePassword = function(req, res) {
	// Init Variables
	var passwordDetails = req.body;

	if (req.user) {
		if (passwordDetails.newPassword) {
			User.findById(req.user.id, function(err, user) {
				if (!err && user) {
					if (user.authenticate(passwordDetails.currentPassword)) {
						if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
							user.password = passwordDetails.newPassword;

							user.save(function(err) {
								if (err) {
									return res.status(400).send({
										message: errorHandler.getErrorMessage(err)
									});
								} else {
									req.login(user, function(err) {
										if (err) {
											res.status(400).send(err);
										} else {
											res.send({
												message: 'Password changed successfully'
											});
										}
									});
								}
							});
						} else {
							res.status(400).send({
								message: 'Passwords do not match'
							});
						}
					} else {
						res.status(400).send({
							message: 'Current password is incorrect'
						});
					}
				} else {
					res.status(400).send({
						message: 'User is not found'
					});
				}
			});
		} else {
			res.status(400).send({
				message: 'Please provide a new password'
			});
		}
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

exports.getLinkedInProfile = function(req, res){
//console.log("GET LINKEDINPROFILE");
Candidate.findOne({_id:req.user.candidate}).populate('user').exec(function(err, user) {
res.json( user);


});

	// Linkedin.auth.getAccessToken(res, req.query.code, function(err, results) {
 //        if ( err )
 //            return console.error(err);

 //        /**
 //         * Results have something like:
 //         * {"expires_in":5184000,"access_token":". . . ."}
 //         */

 //        console.log(results);
 //        return res.redirect('/');
 //    });
	var linkedin = Linkedin.init(req.user.providerData.accessToken);
// 	linkedin.people.me(function(err, $in) {
// 		var h=req.user.providerData.following.companies.values.length;
// 	 for(var d=0;d<h;d++)
// 	{    linkedin.companies.name("ZTE", function(err, company) {
//     console.log(company);
// });}
// 		res.json( $in);
// 	});

	// passport.authenticate('linkedin');
	// passport.authenticate('linkedin');


	
};


/**
 * Get linkedin Profile for the user
 */
var getUniqueErrorMessage = function(err) {
	var output;

	try {
		var fieldName = err.err.substring(err.err.lastIndexOf('.$') + 2, err.err.lastIndexOf('_1'));
		output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';

	} catch(ex) {
		output = 'Unique field already exists';
	}

	return output;
};

/**
 * Get the error message from error object
 */
exports.getErrorMessage = function(err) {
	var message = '';
	
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = getUniqueErrorMessage(err);
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


