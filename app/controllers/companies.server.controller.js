'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Company = mongoose.model('Company'),
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
				message = 'Company already exists';
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
 * Create a Company
 */
exports.create = function(req, res) {
	var company = new Company(req.body);
	company.user = req.user._id;

	company.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(company);
		}
	});
};

/**
 * Show the current Company
 */
exports.read = function(req, res) {
	res.jsonp(req.company);
};

/**
 * Update a Company
 */

exports.update = function(req, res) {
	var company = req.company ;

	company = _.extend(company , req.body);

	company.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(company);
		}
	});
};


var path = require('path');
var fs = require('fs');
var util = require('util');

/// Post files
exports.uploadPicture = function(req, res) {

  fs.readFile(req.files.file.path, function (err, data) {

    var imageName = req.files.file.name

    /// If there's an error
    if(!imageName){

      console.log("There was an error");
      res.redirect("/");
      res.end();

    } else {

       var newPath = __dirname + "../../../uploads/fullsize/" + imageName;

      var thumbPath = __dirname + "../../../uploads/thumbs/" + imageName;
      fs.writeFile(newPath, data, function (err) {
       var company = Company.find({user: req.user._id}).exec(function(err, companies){
         	var old_url = companies[0].logo_url;
			companies[0].logo_url = "/uploads/fullsize/" + imageName;
			companies[0].save(function(err) {
				if (err) {
					return res.send(400, {
						message: getErrorMessage(err)
					});
				} else {
					
					//delete old picture
					if (old_url != '/uploads/fullsize/no-image.jpg') {
						fs.unlink(__dirname + '../../..' + old_url, function (err) {
					  		if (err) console.log(err);
						  	console.log('successfully deleted /tmp/hello');
						});
					};
					res.send("/uploads/fullsize/" + imageName)
				}
			});
		});

         

      });
    }
  });
};


/**
 * Delete an Company
 */
exports.delete = function(req, res) {
	var company = req.company ;

	company.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(company);
		}
	});
};

/**
 * List of Companies
 */
exports.list = function(req, res) { Company.find().sort('-created').populate('user', 'displayName').exec(function(err, companies) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(companies);
		}
	});
};

/**
 * Company middleware
 */
exports.companyByID = function(req, res, next, id) { Company.findById(id).populate('user', 'displayName').exec(function(err, company) {
		if (err) return next(err);
		if (! company) return next(new Error('Failed to load Company ' + id));
		req.company = company ;
		next();
	});
};

/**
 * Company authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.company.employers.indexOf(req.user.employer) === -1){
		return res.send(403, 'User is not authorized');
	}
	next();
};

exports.getImage =  function (req, res){
  var path = __dirname + "../../../uploads/fullsize/" + req.params.file;
//   file = req.params.file;
	

  var img = fs.readFileSync(path);
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');

};