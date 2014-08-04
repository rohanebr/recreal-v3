'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
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
				message = 'Candidate already exists';
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
 * Create a Candidate
 */
// exports.create = function(req, res) {
// 	var candidate = new Candidate(req.body);
// 	candidate.user = req.user;
// 	req.user.candidate = candidate;
// 	req.user.save();

// 	candidate.save(function(err) {
// 		if (err) {
// 			return res.send(400, {
// 				message: getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(candidate);
// 		}
// 	});
// };

/**
 * Show the current Candidate
 */
exports.read = function(req, res) {
	res.jsonp(req.candidate);
};

/**
 * Update a Candidate
 */
exports.update = function(req, res) {
	var candidate = req.candidate ;

	candidate = _.extend(candidate , req.body);

	candidate.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(candidate);
		}
	});
};

/**
 * Delete an Candidate
 */
exports.delete = function(req, res) {
	var candidate = req.candidate ;

	candidate.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(candidate);
		}
	});
};

/**
 * List of Candidates
 */
exports.list = function(req, res) { 
	Candidate.find().sort('-created').populate('user', 'displayName').exec(function(err, candidates) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(candidates);
		}
	});
};

/**
 * Candidate middleware
 */
exports.candidateByID = function(req, res, next, id) {
	Candidate.findById(id).populate('user', 'displayName').exec(function(err, candidate) {
		if (err) return next(err);
		if (! candidate) return next(new Error('Failed to load Candidate ' + id));
		req.candidate = candidate ;
		next();
	});
};

/**
 * Candidate authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.candidate.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};


/**
 * Update a Candidate
 */
exports.deleteSkill = function(req, res) {
	// var candidate = req.candidate ;

	// candidate = _.extend(candidate , req.body);



	// candidate.save(function(err) {
	// 	if (err) {
	// 		return res.send(400, {
	// 			message: getErrorMessage(err)
	// 		});
	// 	} else {
	// 		res.jsonp(candidate);
	// 	}
	// });
	

	console.log('method called!');


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

      /// write file to uploads/fullsize folder
      fs.writeFile(newPath, data, function (err) {

        /// write file to uploads/thumbs folder
        // im.resize({
        //   srcPath: newPath,
        //   dstPath: thumbPath,
        //   width:   200
        // }, function(err, stdout, stderr){
        //   if (err) throw err;
        //   console.log('resized image to fit within 200x200px');
        // });

         // res.redirect("/uploads/fullsize/" + imageName);

         var candidate = Candidate.find({user: req.user._id}).exec(function(err, candidates){
         	var old_url = candidates[0].picture_url;
			candidates[0].picture_url = "/uploads/fullsize/" + imageName;
			candidates[0].save(function(err) {
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

// Show files
exports.getImage =  function (req, res){
  var path = __dirname + "../../../uploads/fullsize/" + req.params.file;
//   file = req.params.file;
	

  var img = fs.readFileSync(path);
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');

};