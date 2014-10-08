'use strict';

//  git test comment by ejaz

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),Candidate = mongoose.model('Candidate'),_ = require('lodash');


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
 * Delete a Candidate
 */
exports.addSkill=function(req,res)
{
var userId=req.user._id;
if(req.user.userType === 'candidate')
{
var c;
var skill=req.body;
console.log(skill);
Candidate.update(
      { user: userId },
      { $push: { skills : skill } },
      { safe: true },
      function removeConnectionsCB(err, obj) {

      });

}

console.log("add Skill function called");


}
exports.deleteSkill = function(req, res) {
var userId=req.user._id;
if(req.user.userType === 'candidate')
{
var c;
var skill=req.body;

Candidate.update(
      { user: userId },
      { $pull: { skills : { _id : skill._id } } },
      { safe: true },
      function removeConnectionsCB(err, obj) {

      })

}


	console.log('method called delete Skill!');


};


//Update skills
exports.updateSkill = function(req, res) {


	if(req.user.userType === 'candidate')
    {
    var c;
    var skill=req.body;
var id=req.user._id;

//moongoose is like a retarded person we have to go in the moongooseDocumentarray and change each entry within the
//array one by one. then tell the moongoose that skills has been modified and then save it. If you dont follow this
//exact pattern you cannot update anything right. As of this current version moongoose is retarded
var cand = Candidate.findOne({user:id}).exec(function(err, candidate){
candidate.skills.forEach(function (item) {
if(item._id==skill._id)
      {
      item.title=skill.title;
      item.level=skill.level;
      item.experience=skill.experience;
      item.last_used=skill.last_used;
      }

    });

candidate.markModified('skills');
         candidate.save();

    		});



    }

    	console.log('method called update skill!!');




};

//Delete   Experience
//A better implementation then deleteskill function. DeleteSkill is wrong. There was a weird problem been faced when using deleteskill lookalike function.
//It was deleting the other entry although the ids and all the variables were sent right from the front-end and even checked
//here.
//added @ 4:49 AM 10/4/2014: deleteskill function is wrong.
//created @ 4:49 AM 10/4/2014
//added by:asadullah baig
exports.deleteExperience = function(req, res) {
var userId=req.user._id;
if(req.user.userType === 'candidate')
{
var c;
var experience=req.body;
console.log(experience._id);
console.log(experience.company_name);
Candidate.update({ user: userId },{ $pull: { positions : { _id : experience._id } } }, { safe: true }, function removeConnectionsCB(err, obj) { })}console.log('method called delete Experience!');
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

//In the image of deleteExperience
//created @ 6:09 AM 10/4/2014
//added by:asadullah baig
//Delete Project
exports.deleteProject=function(req,res)
{
var ProjectId=req.user._id;
if(req.user.userType === 'candidate')
{
var c;
var project=req.body;
console.log(project._id);
console.log(project.name);
Candidate.update(
      { user: ProjectId },
      { $pull: { projects : { _id : project._id } } },
      { safe: true },
      function removeConnectionsCB(err, obj) {

      })

}


	console.log('method called delete Project!');


};

//In the image of updateSkill
//created @ 4:55 AM 10/4/2014
//added by:asadullah baig
exports.updateExperience = function(req, res) {


	if(req.user.userType === 'candidate')
    {
    var c;
    var position=req.body;
var id=req.user._id;
var cand = Candidate.findOne({user:id}).exec(function(err, candidate){
candidate.positions.forEach(function (item) {
if(item._id==position._id)
      {
      item.company_name=position.company_name;
      item.title=position.title;
      item.summary=position.summary;
      item.company_industry=position.company_industry;
      item.start_date=position.start_date;
      item.end_date=position.end_date;
      item.is_current=position.is_current;
      item.company_location=position.company_location;
      }

    });

candidate.markModified('skills');
         candidate.save();

    		});



    }

    	console.log('method called update skill!!');




};

// Show files
exports.getImage =  function (req, res){
  var path = __dirname + "../../../uploads/fullsize/" + req.params.file;
//   file = req.params.file;
	

  var img = fs.readFileSync(path);
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');

};