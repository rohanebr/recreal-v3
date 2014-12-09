'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    User= mongoose.model('User'),
	nodemailer = require('nodemailer'),
	async = require('async'),
	crypto = require('crypto'),
	config = require('../../config/config'),
	Employer = mongoose.model('Employer'),
	Company = mongoose.model('Company');
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
*SIGNUP FOR EMPLOYER ONLY
*/
exports.signupemployer = function(req, res) {
console.log("IT CAME");
	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	// Init Variables
	var user = new User(req.body);
	var message = null;

	// Add missing user fields
	user.provider = 'local';
	user.displayName = user.firstName + ' ' + user.lastName;
	



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
				url: 'http://' + req.headers.host + '/#!/emp-wizard-one/' + token
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

/**
*Validation of the activeToken
*/
exports.ValidateToken = function(req,res){
console.log(req.body.token);
User.findOne({"activeToken":req.body.token}).exec(function(err, user){
if(user)
	res.jsonp({user:user});
if(!user)
	res.jsonp({user:"nothing"});


});
	
};

/**
*Basic Info of company and employer saved
*/
exports.SaveEmpSignUpWizardOneData = function(req,res)
{
	console.log("SAVEEMPSIGNUP"+req.body.user._id);
 User.findById(req.body.user._id,function(err,user){
if(user)
{
   			var employer = new Employer();
			user.employer = employer;
			user.stage="Basic";
			var company = new Company();
			employer.company = company;
			company.employers.push(employer);
			company.user = user;
			company.save();
			employer.firstName = user.firstName;
			employer.lastName = user.lastName;
			employer.displayName = user.displayName;
			employer.user = user;
			employer.save();
			user.markModified('employer');
			user.markModified('stage');
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





}



 });



};