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
	Company = mongoose.model('Company'),
	passport = require('passport'),
	Thread = mongoose.model('Thread'),
	JobSocket = require('../sockets/job.server.socket.js'),
	Job = mongoose.model('Job');

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

	var newEmployer = new Employer();
	user.employer = newEmployer;
	var company = new Company();
	newEmployer.company = company;
	company.employers.push(newEmployer);
	company.user = user;
	company.save();


	newEmployer.firstName = user.firstName;
    newEmployer.lastName = user.lastName;
    newEmployer.displayName = user.displayName;
    newEmployer.user = user;
    newEmployer.save();




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
	console.log(user);
if(user)
	{	
		if(user.stage == "DeActive")
		{
			user.stage = "Basic";
			user.save(function(err) {
				
							});
		}
	
		Company.findOne({"user":user._id}).exec(function(err,company){


			console.log("COMPANY"+company);
			if (!user) {
			res.send(400, info);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

	    
			req.login(user, function(err) {
				if (err) {
					res.send(400, err);
				} else {
					
					res.jsonp({user:user,company:company});
				}
			});
		}
		});

	
		
	

}
if(!user)
	res.jsonp({user:"nothing"});


});
	
};

/**
*Basic Info of company and employer saved
*/
exports.SaveEmpSignUpWizardOneData = function(req,res)
{
	console.log("SAVEEMPSIGNUP"+req.body.job);
 	User.findById(req.body.user._id,function(err,user){
		if(user.stage=='Basic')
		{
   			var employer = new Employer();
			user.employer = employer;
			var company=new Company(req.body.company);
			employer.role=req.body.employer.role;
            company.employers.push(employer);
            company.country=req.body.company.country.name;
            company.city=req.body.company.city.name;
			company.user = user;
			company.save();
			employer.firstName = user.firstName;
			employer.lastName = user.lastName;
			employer.displayName = user.displayName;
			employer.user = user;
			employer.company = company;
			
			employer.save();
			user.stage="CompanyLocation";
			user.save(function(err) {
				if (err) {
					newEmployer.remove();
					return res.send(400, {
						message: getErrorMessage(err)
					});
				} else {
					res.jsonp({status: true});
				}
			});
		}
		else
		{
			Company.findOne({"user":req.body.user._id}).exec(function(err,company){
				company = _.extend(company , req.body.company);
				company.country=req.body.company.country.name;
				company.city=req.body.company.city.name;
				company.save(function(err) {
					if (err) {
						return res.send(400, {
							message: getErrorMessage(err)
						});
					} else {
						res.jsonp(company);
					}
				});
			});
		}
 	});
};

exports.getCountryCity = function (req,res)
{
	Company.findOne({"user":req.body.user._id}).exec(function(err,company){
	res.jsonp({city:company.city,country:company.country,latitude:company.coordinates.latitude,longitude:company.coordinates.longitude});

	});
};

exports.saveLatLong = function(req,res)
{
	var user=req.body.user;
	User.findOne({_id:req.body.user._id}).exec(function(err,user){
		if(user)
		{
			if(user.stage == "CompanyLocation")
				user.stage="NoJobs";
			user.markModified('stage');
			Company.findOne({"user":req.body.user._id}).exec(function(err,company){
				console.log(company);
				company.coordinates.latitude=req.body.latitude;
				company.coordinates.longitude=req.body.longitude;
				company.markModified('coordinates');
				company.save(function(err){
					if(!err)
					{
						user.save(function(err){if(!err){console.log(company);
						res.jsonp(user.employer);}else{console.log("SAVE LAT LONG");
						res.jsonp({stat:"Couldnt save company. check backend"});}});
					}
				});
			});

		}
	});
};

exports.SaveJobDataOne = function(req,res)
{
	if (req.user.userType === 'employer') 
	{

        var job = new Job(req.body);
        job.user = req.user;
        var emp = Employer.find({
            user: req.user._id
        	}).populate('company').exec(function(err, employers) {
	            job.employer = employers[0]._id;
	            job.company = employers[0].company._id;
	            employers[0].jobs.push(job);
	            var company = employers[0].company;
	            company.jobs.push(job);
	            company.save();
	            job.save(function(err) {
	                if (err) {
	                    return res.send(400, {
	                        message: getErrorMessage(err)
	                    });
	                } else {
	                    employers[0].save();
	                    JobSocket.jobPosted({
	                        job: job
	                    });
	                    res.jsonp(job);
	                }
	            });
	        });
    }
};



exports.companyByUserId = function(req,res)
{
	console.log(req.body+ "  COMPANY BY USER ID");
Company.findOne({"user":req.body.id}).exec(function(err,company){
if(company)
{
res.jsonp({country:company.country,city:company.city,latitude:company.coordinates.latitude,longitude:company.coordinates.longitude});

}



});



};