'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Employer = mongoose.model('Employer'),
	Job = mongoose.model('Job'),
	Candidate = mongoose.model('Candidate'),
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
				message = 'Employer already exists';
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
 * Create an Employer
 */
// exports.create = function(req, res) {
// 	var employer = new Employer(req.body);
// 	employer.user = req.user;

// 	employer.save(function(err) {
// 		if (err) {
// 			return res.send(400, {
// 				message: getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(employer);
// 		}
// 	});
// };

/**
 * Show the current Employer
 */
exports.read = function(req, res) {
	res.jsonp(req.employer);
};

/**
 * Update a Employer
 */
exports.update = function(req, res) {
	var employer = req.employer ;

	employer = _.extend(employer , req.body);

	employer.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(employer);
		}
	});
};

/**
 * Delete an Employer
 */
exports.delete = function(req, res) {
	var employer = req.employer ;

	employer.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(employer);
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

      console.log("There was an error")
      res.redirect("/");
      res.end();

    } else {

       var newPath = __dirname + "../../../uploads/fullsize/" + imageName;

      var thumbPath = __dirname + "../../../uploads/thumbs/" + imageName;
      fs.writeFile(newPath, data, function (err) {
       var employer = Employer.find({user: req.user._id}).populate('user', 'picture_url').exec(function(err, employers){
         	var old_url = employers[0].user.picture_url;
			employers[0].user.picture_url = "/uploads/fullsize/" + imageName;
			employers[0].user.save(function(err) {
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
 * List of Employers
 */
exports.list = function(req, res) { Employer.find().sort('-created').populate('user', 'displayName').populate('jobs').exec(function(err, employers) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(employers);
		}
	});
};

/**
 * Employer middleware
 */
exports.employerByID = function(req, res, next, id) { Employer.findById(id).populate('user', 'displayName').exec(function(err, employer) {
		if (err) return next(err);
		if (! employer) return next(new Error('Failed to load Employer ' + id));
		req.employer = employer ;
		next();
	});
};

/**
 * Employer authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.employer.user.id !== req.user.id) {
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


exports.addToFavorites = function(req, res, next) {

    if (req.user.userType === 'employer') {

        var employerId = req.user.employer;
        var candidateId = req.body.candidateId;
        var jobId = req.body.jobId;




        Employer.findOne({
            _id: employerId
        }).exec(function(err, employer) {

            var exists = false;
            employer.favorites.forEach(function(fav) {
                if (fav.candidate == candidateId) {
                    exists = true;
                }
            });

            if (!exists) {
                Job.findOne({
                    _id: jobId
                }).exec(function(err, job) {
                    Candidate.findOne({
                        _id: candidateId
                    }).exec(function(err, candidate) {
                        employer.addToFavorites(candidate, job);
                        res.jsonp(employer);
                    });
                });
            }
        });

    }
};


exports.removeFromFavorites = function(req, res, next) {

    if (req.user.userType === 'employer') {
        var jobId = req.body.jobId;
        var candidateId = req.body.candidateId;


        Employer.findByIdAndUpdate(req.user.employer, {
            $pull: {
                favorites: {
                    candidate: candidateId
                }
            }
        }, function(err, job) {
            res.jsonp(true);
        });

    }
};

/**
 * Show the current Job
 */
exports.getFavoriteCandidates = function(req, res) {
    Employer.findOne({
        _id: req.user.employer
    }).populate('favorites').populate('favorites.candidate').exec(function(err, employer) {
        // User.findOne({_id: job.})
        res.jsonp(employer);
    });
};