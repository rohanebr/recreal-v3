'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    User= mongoose.model('User'),
    Candidate= mongoose.model('Candidate'),
	nodemailer = require('nodemailer'),
	async = require('async'),
	crypto = require('crypto'),
	config = require('../../config/config'),
	passport = require('passport'),
	Thread = mongoose.model('Thread');
/**
 * Create a Candidate signup wizard
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


exports.signupcandidate = function(req, res) {
	console.log("IT CAME");
	delete req.body.roles;

	// Init Variables
	var user = new User(req.body);
	var message = null;

	// Add missing user fields
	user.provider = 'local';
	user.displayName = user.firstName + ' ' + user.lastName;

	var newCandidate = new Candidate();
	newCandidate.firstName = user.firstName;
    newCandidate.lastName = user.lastName;
    newCandidate.displayName = user.displayName;
    newCandidate.user = user;
    newCandidate.save();




	var thread = new Thread();
	thread.created= Date.now();
	thread.updated= Date.now();
	thread.receiver=user;
	thread.subject="Welcome to Recreal";
	thread.messages.push({messageBody:"Our team welcomes you to Recreal. The only site which provides real time synergetic hiring!!",created:Date.now()});
	thread.save();
	user.threads.push(thread);



	// Then save the user 
	user.save(function(err) {
		if (err) {
			
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
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
				}, function(err, user) {
					if (!user) {
						return res.status(400).send({
							message: 'No account with that username has been found'
						});
					} else if (user.provider !== 'local') {
						return res.status(400).send({
							message: 'It seems like you signed up using your ' + user.provider + ' account'
						});
					} else {
						user.activeToken = token;
					

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
			res.render('templates/active-account', {
				name: user.displayName,
				appName: config.app.title,
				url: 'http://' + req.headers.host + '/#!/candidate-wizard-one/' + token
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
				subject: 'Account Activation on Recreal',
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
			res.jsonp({status: true});
		}
	});
};

exports.ValidateToken = function(req,res){
	console.log(req.body.token);
	User.findOne({"activeToken":req.body.token}).exec(function(err, user){
		console.log(user);
		if(user)
		{	
			if(user.stage == "DeActive")
			{
				user.stage = "Basic";
				user.save(function(err) {
					
				});
			}
			Candidate.findOne({"user":user._id}).exec(function(err,candidate){
				if (!user) {
					res.send(400, info);
				} else {
					// // Remove sensitive data before login
					// user.password = undefined;
					// user.salt = undefined;
					req.login(user, function(err) {
						if (err) {
							res.send(400, err);
						} else {
							
							res.jsonp({user:user,candidate:candidate});
						}
					});
				}
			});
		}
		if(!user)
			res.jsonp({user:"nothing"});
	});
};

exports.SaveCandidateWizardOne = function(req,res){
	console.log("candidate wizard one called");
	res.jsonp({status: true});
};

exports.SaveCandidateWizardTwo = function(req,res){
	console.log("candidate wizard two called");
	res.jsonp({status: true});
};

exports.SaveCandidateWizardThree = function(req,res){
	console.log("candidate wizard three called");
	res.jsonp({status: true});
};

exports.SaveCandidateWizardFour = function(req,res){
	console.log("candidate wizard four called");
	res.jsonp({status: true});
};

exports.SaveCandidateWizardFive = function(req,res){
	console.log("candidate wizard five called");
	res.jsonp({status: true});
};