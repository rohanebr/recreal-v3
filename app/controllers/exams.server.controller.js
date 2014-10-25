'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Exam = mongoose.model('Exam'),
	Candidate = mongoose.model('Candidate'),
	ExamSocket = require('../sockets/exams.server.socket.js'),
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
				message = 'Exam already exists';
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
 * Create a Exam
 */
exports.create = function(req, res) {
	var exam = new Exam(req.body);
	exam.user = req.user;

	exam.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(exam);
		}
	});
};

/**
 * Show the current Exam
 */
exports.read = function(req, res) {
	res.jsonp(req.exam);
};

/**
 * Update a Exam
 */
exports.update = function(req, res) {
	var exam = req.exam ;

	exam = _.extend(exam , req.body);

	exam.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(exam);
		}
	});
};

/**
 * Delete an Exam
 */
exports.delete = function(req, res) {
	var exam = req.exam ;

	exam.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(exam);
		}
	});
};

exports.saveExam = function(req, res) {
    var examTaken=req.body;
	var id=req.user._id;
	var cand = Candidate.findOne({user:id}).exec(function(err, candidate){
		candidate.examsTaken.push(examTaken);
		candidate.markModified('examsTaken');
	    candidate.save();

	    candidate.examsTaken.forEach(function (item) {
			if(item.exam==examTaken.exam){
				return res.jsonp(item);
			}
	    });
	    
	});
	console.log('method called update examTaken!!');
};


/**
 * List of Exams
 */
exports.list = function(req, res) { Exam.find().sort('-created').populate('user', 'displayName').exec(function(err, exams) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(exams);
		}
	});
};

exports.getResult = function(req, res) {
	res.jsonp(req.examTaken);
};

exports.sendTest = function(req, res){

	var candidates=req.body.candidates;
	var tests=req.body.tests;
	console.log(tests[0]);
var candidatesalreadygiventest=[];
	Candidate.find().find({"_id":{$in:candidates}}).populate('examsTaken.exam').exec(function(err,docs){

              for(var h=0,d=docs.length;h<d;h++)
              { var examstaken=docs[h].examsTaken;
              	        for(var w=0,x=examstaken.length;w<x;w++)
              	        {var testtaken=false;
                                for( var q=0,a=tests.length;q<a;q++)
                                	{  
                                     console.log(examstaken[w]+tests[q]);
                                      if(examstaken[w].exam._id==tests[q])
                                      	{testtaken=true;
                                      		candidatesalreadygiventest=docs[h];
                                    }
                                  
                                	}
                                	if(!testtaken)
                                	{ 
                                	  console.log(tests[q]);
                                      examstaken.push({score:0,exam:tests[q],isPass:false,state:"notTaken"});
                                      console.log(docs[h].displayName);
                                 ExamSocket.notifyCandidateToGiveTest({generalmessage: "Please click on the link to give the test",hiddendata:"/takeExam/"+tests[q],created:Date.now()});
              //ExamSocket.notifyCandidateToGiveTest({generalmessage: "asdaf"});

                                	}

              	        }
              	        if(examstaken.length==0)
              	        {console.log("TESTS"+tests[0]);
              	    for(var hh=0,dd=tests.length;hh<dd;hh++)
                         {
                         	examstaken.push({score:0,exam:tests[hh],isPass:false,state:"notTaken"});
                            ExamSocket.notifyCandidateToGiveTest({generalmessage: "Please click on the link to give the test",hiddendata:"/takeExam/"+tests[hh],created:Date.now()});
                         }
                          console.log(docs[h].displayName);

              	        }

              	    docs[h].markModified('examsTaken');
              	     docs[h].save();


                  

              }
              if(candidatesalreadygiventest.length!=0)
             { res.jsonp({data:"already given test",candidates:candidatesalreadygiventest});}
	else
		res.jsonp({data:"none have given test"});

	});
// 	Candidate.find({
//     '_id': { $in: [
//         candidates
//     ]}
// }, function(err, docs){
	
//          for(var d=0,g=docs.length;d<g;d++)
//          {

//          	       var examtaken=docs[d].examsTaken;
                         



//          }


    
// });


	
};

/**
 * Exam Result middleware
 */
exports.examResultByID = function(req, res, next, id) { 
	var userId=req.user._id;
	var cand = Candidate.findOne({user:userId}).populate('examsTaken.exam').exec(function(err, candidate){
		if(candidate){
		    candidate.examsTaken.forEach(function (item) {
				if(item._id==id){
					req.examTaken = item ;
					next();
				}
		    });
		}
	});
};

/**
 * Exam middleware
 */
exports.examByID = function(req, res, next, id) { 
	Exam.findById(id).populate('user', 'displayName').exec(function(err, exam) {
		if (err) return next(err);
		if (! exam) return next(new Error('Failed to load Exam ' + id));
		req.exam = exam ;
		next();
	});
};

/**
 * Exam authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.exam.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};