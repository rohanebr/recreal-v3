'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Job = mongoose.model('Job'),
    Employer = mongoose.model('Employer'),
    Candidate = mongoose.model('Candidate'),
    JobSocket = require('../sockets/job.server.socket.js'),
    _ = require('lodash');


    Array.prototype.asyncEach = function(iterator) {
  var list    = this,
      n       = list.length,
      i       = -1,
      calls   = 0,
      looping = false;

  var iterate = function() {
    calls -= 1;
    i += 1;
    if (i === n) return;
    iterator(list[i], resume);
  };

  var loop = function() {
    if (looping) return;
    looping = true;
    while (calls > 0) iterate();
    looping = false;
  };

  var resume = function() {
    calls += 1;
    if (typeof setTimeout === 'undefined') loop();
    else setTimeout(iterate, 1);
  };
  resume();
};

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {

    var message = '';
    if (err.message)
        message = err.message;


    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Job already exists';
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
 * Create a Job
 */
exports.create = function(req, res) {
    console.log(req.user.candidate);
    if (req.user.userType === 'employer') {
        var job = new Job(req.body);
        job.user = req.user;
        console.log(req.user._id);

        var emp = Employer.find({
            user: req.user._id
        }).populate('company').exec(function(err, employers) {
            console.log(employers[0]._id);
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

/**
 * Show the current Job
 */
exports.read = function(req, res) {
    Job.findOne({
        _id: req.job._id
    }).populate('company').exec(function(err, job) {
        res.jsonp(job);
    });
};

/**
 * Show the current Job
 */
exports.getJobCandidates = function(req, res) {
    Job.findOne({
        _id: req.job._id
    }).populate('candidates').exec(function(err, job) {




        res.jsonp(job);
    });
};

/**
 * Show the current Job
 */
exports.getShortListedCandidates = function(req, res) {
    Job.findOne({
        _id: req.job._id
    }).populate('shortListedCandidates').populate('shortListedCandidates.candidate').exec(function(err, job) {
        // User.findOne({_id: job.})
        res.jsonp(job);
    });
};

exports.apply = function(req, res, next)

{
    if (req.user.userType === 'candidate') {
        var job = req.job;
        Job.findOne({
                _id: req.job._id
            })
            .exec(function(err, doc) {

                job = doc;
                Candidate.findOne({
                    user: req.user._id
                }).exec(function(err, candidate) {
                    Job.findOne({
                            _id: job._id
                        })
                        .where({
                            candidates: candidate._id
                        })
                        .exec(function(err, doc) {
                            if (!doc) {
                                //doc.apply(candidate);
                                job.apply(candidate);
                                JobSocket.applicationReceived({
                                    job: job
                                });
                                res.jsonp(req.job);
                            }
                        });
                });
            });
    }
};


/**
 * Update a Job
 */
exports.update = function(req, res) {
    var job = req.job;

    job = _.extend(job, req.body);

    job.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(job);
        }
    });
};

/**
 * Delete an Job
 */
exports.delete = function(req, res) {
    var job = req.job;

    job.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(job);
        }
    });
};

/**
 * List of Jobs
 */
exports.list = function(req, res) {
    Job.find().sort('-created').populate('user', 'displayName').populate('company').exec(function(err, jobs) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(jobs);
        }
    });
};

/**
 * Job middleware
 */
exports.jobByID = function(req, res, next, id) {
    Job.findById(id).populate('user', 'displayName').exec(function(err, job) {
        if (err) return next(err);
        if (!job) return next(new Error('Failed to load Job ' + id));
        req.job = job;
        next();
    });
};

exports.addToShortList = function(req, res, next) {

    if (req.user.userType === 'employer') {

        var jobId = req.body.jobId;
        var candidateId = req.body.candidateId;




        Job.findOne({
            _id: jobId
        }).exec(function(err, job) {

            var exists = false;
            job.shortListedCandidates.forEach(function(slc) {
                if (slc.candidate == candidateId) {
                    exists = true;
                }
            });

            if (!exists) {
                Employer.findOne({
                    user: req.user._id
                }).exec(function(err, employer) {
                    Candidate.findOne({
                        _id: candidateId
                    }).exec(function(err, candidate) {
                        job.addToShortList(candidate, employer);
                        res.jsonp(job);
                    });
                });
            }
        });

    }
};


exports.removeFromShortList = function(req, res, next) {

    if (req.user.userType === 'employer') {
        var jobId = req.body.jobId;
        var candidateId = req.body.candidateId;


        Job.findByIdAndUpdate(jobId, {
            $pull: {
                shortListedCandidates: {
                    candidate: candidateId
                }
            }
        }, function(err, job) {
            res.jsonp(job);
        });

    }
};


/**
 * Job authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.job.user.id !== req.user.id) {
        return res.send(403, 'User is not authorized');
    }
    next();
};


exports.onePlusView = function(req, res) {


    var numberofviews = req.job.views;
    var alreadyviewedbytheuser = false;

    Job.findById(req.job._id).exec(function(err, job) {
        console.log(job);
        if (req.job.views.length == 0)
            job.views.push(req.body.user._id);
        if (req.job.views.length > 0) {
            for (var d = 0; d < numberofviews.length; d++) {
                var views = job.views[d];
                if (views.equals(req.user.id))
                    alreadyviewedbytheuser = true;

            }

            if (!alreadyviewedbytheuser)
                job.views.push(req.body.user._id);



        }

        job.markModified('views');
        job.save();


    });




};


exports.getPaginatedCandidates = function(req, res) {
    var filters = [];
var dbfilters = ["salary_expectation", "visa_status", "employee_status", "employee_type"];

    var incomingfilters = [];
    console.log(req.body.filter);

    //entry.type shld be equal to any field given in the candidate model 
    //it is important to name them exactly as the model variables
    var previousentry = "";
    var previouscount=0;
    var count = 0;
    var g=0;
    var ffilter=req.body.filter;
var dummy;

    // for(var h=g,j=ffilter.length;h<j;h++)            //salary_expectation salary_exepectation visa_status salary_expecetation visa_status
    // {

    //        for(var t=h+1;t<j;t++)
    //        {
    //             if(ffilter[h].type==ffilter[t].type)
    //                {g++;      //2

    //                 dummy=ffilter[h+count];
                   
    //                 ffilter[h+count]=ffilter[t];
    //                  ffilter[t]=dummy;
    //                  count++;

    //                         }


    //        }



    // }


    ffilter.sort(dynamicSort("priority"));



    count = 0;
    console.log(ffilter);
    ffilter.forEach(function(entry) {
        if (entry.type != previousentry)
            count++;
        
        entry.priority = count;
        if(previouscount!=count)
        incomingfilters.push({name:[entry.name],type:entry.type,priority:entry.priority});
    else
    {
   incomingfilters[incomingfilters.length-1].name.push(entry.name);

    }
        previousentry = entry.type;
previouscount=count;

    });

var incomingfilters2=incomingfilters.slice();

console.log(incomingfilters2);
    Job.findById(req.job.id)
        .exec(function(err, job) {

            var candidates = job.candidates;



            var totallength = job.candidates.length;
            var selectedCandidates = Candidate.find({
                "_id": {
                    $in: candidates
                }
            });
            var once = true;
            count = 1;
            var firstfilter = [];
            var priority=1;
            incomingfilters.forEach(function(entry) {
                if (entry.priority == priority)
                    {firstfilter.push(entry);
                        once=false;
                    }
               



            });

            if(incomingfilters.length!=0)
            {   
                 var lengthincomingfilters=incomingfilters.length;
                 for(var h=0,t=dbfilters.length;h<t;h++)
                    {  var alreadyPresent=false;
                         for(var y=0,w=incomingfilters.length;y<w;y++)
                         {
                            if(incomingfilters[y].type==dbfilters[h])
                                          alreadyPresent=true;

                         }
                         if(!alreadyPresent)
                            incomingfilters.push({name:[""],type:dbfilters[h],priority:-4});
 
                    }
                var letspopulatefilters=[];
               var x=0;
                  incomingfilters.asyncEach(function(incomingfilter,resume) 
               {
                if(letspopulatefilters.length!=0)
                {    for(var h=0;h<letspopulatefilters.length;h++)
                    {
                        console.log(h);
                        var names=letspopulatefilters[h].name;
                     selectedCandidates.where(letspopulatefilters[h].type).in(names);
}
                } 

               
                  selectedCandidates.exec(function(err, candidates) {
                 if(x<lengthincomingfilters)
                 letspopulatefilters.push(incomingfilter);
                x++;
                 filters = sortandfilter(incomingfilter.type, candidates,incomingfilters2, filters);
                
            
            if(x==incomingfilters.length)
               { 
               totallength=candidates.length;


                      selectedCandidates.skip(req.body.skip);
            selectedCandidates.limit(req.body.limit);
            selectedCandidates.select('displayName title objective picture_url location salary_expectation visa_status employee_type employee_status skills');
            selectedCandidates.exec(function(err, candidate) {
                console.log(filters);
                res.jsonp({
                    candidates: candidate,
                    totalentries: totallength,
                    job: job,
                    filters: filters
                });
            });} 

                         });


resume();

              });


               }


                
               
               

            
            console.log(filters);
      
                     if (incomingfilters.length == 0) {
                selectedCandidates.exec(function(err, candidates) {
                    for (var s = 0; s < dbfilters.length; s++) {
                       
                        filters = sortandfilter(dbfilters[s], candidates, incomingfilters, filters);
                    }


                });
                selectedCandidates.skip(req.body.skip);
            selectedCandidates.limit(req.body.limit);
            selectedCandidates.select('displayName title objective picture_url location salary_expectation visa_status employee_type employee_status skills');
            selectedCandidates.exec(function(err, candidate) {
                console.log(filters);
                res.jsonp({
                    candidates: candidate,
                    totalentries: totallength,
                    job: job,
                    filters: filters
                });
            });

            }
       
            

        });
};

     // if (incomingfilters.salaryFilters.length != 0)
            //     selectedCandidates.where("salary_expectation").in(getNames(incomingfilters.salaryFilters));
            // if (incomingfilters.visaFilters.length != 0)
            //     selectedCandidates.where("visa_status").in(getNames(incomingfilters.visaFilters));
            // if (incomingfilters.employeestatusFilters.length != 0)
            //     selectedCandidates.where("employee_status").in(getNames(incomingfilters.employeestatusFilters));
            // if (incomingfilters.employeetypeFilters.length != 0)
            //     selectedCandidates.where("employee_type").in(getNames(incomingfilters.employeetypeFilters));

            // selectedCandidates.exec(function(err, candidates) {
            //     totallength = candidates.length;




            // });






















































function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}




var getNames = function(filter) {

    var names = [];
    filter.forEach(function(entry) {
        names.push(entry.name);


    });

    return names;


}

var sortandfilter = function(type, candidates, incomingfiltersit, filters) {
    var incomingfilters=[];
incomingfiltersit.forEach(function(entry){

    for(var h=0,j=entry.name.length;h<j;h++)
           {
      incomingfilters.push({name:entry.name[h],type:entry.type});


           }



});
    if (type == "salary_expectation") {
        candidates.sort(function(a, b) {
            if (a.salary_expectation && b.salary_expectation)
                var salaryA = a.salary_expectation.toLowerCase(),
                    salaryB = b.salary_expectation.toLowerCase()
            if (salaryA < salaryB) //sort string ascending
                return -1
            if (salaryA > salaryB)
                return 1
            return 0 //default return value (no sorting)
        });

        var filterValue = 'invalid_value';
        for (var i = 0, len = candidates.length; i < len; i++) {
            var candidate = candidates[i];
            var isPresent = false;

            if (candidate.salary_expectation !== filterValue) {
                filterValue = candidate.salary_expectation;
                incomingfilters.forEach(function(entry) {
                    if (entry.name == filterValue)

                        isPresent = true;



                });
                filters.push({
                    type: "salary_expectation",
                    name: filterValue,
                    count: 0,
                    value: isPresent

                });
            }
            filters[filters.length - 1].count++;
        }
        return filters;
    }
    if (type == "visa_status") {
        candidates.sort(function(a, b) {
            if (a.visa_status && b.visa_status)
                var visaA = a.visa_status.toLowerCase(),
                    visaB = b.visa_status.toLowerCase()
            if (visaA < visaB) //sort string ascending
                return -1
            if (visaA > visaB)
                return 1
            return 0 //default return value (no sorting)
        });

        var filterValue = 'invalid_value';
        for (var i = 0, len = candidates.length; i < len; i++) {
            var candidate = candidates[i];
            var isPresent = false;

            if (candidate.visa_status !== filterValue) {

                filterValue = candidate.visa_status;
                incomingfilters.forEach(function(entry) {
                    if (entry.name == filterValue)

                        isPresent = true;



                });
                filters.push({
                    type: "visa_status",
                    name: filterValue,
                    count: 0,
                    value: isPresent
                });
            }
            filters[filters.length - 1].count++;
        }
        return filters;

    }
    if (type == "employee_type") {
        candidates.sort(function(a, b) {
            if (a.employee_type && b.employee_type)
                var employee_typeA = a.employee_type.toLowerCase(),
                    employee_typeB = b.employee_type.toLowerCase()
            if (employee_typeA < employee_typeB) //sort string ascending
                return -1
            if (employee_typeA > employee_typeB)
                return 1
            return 0 //default return value (no sorting)
        });

        var filterValue = 'invalid_value';
        for (var i = 0, len = candidates.length; i < len; i++) {
            var candidate = candidates[i];
            var isPresent = false;
            if (candidate.employee_type !== filterValue) {
                filterValue = candidate.employee_type;
                incomingfilters.forEach(function(entry) {
                    if (entry.name == filterValue)

                        isPresent = true;
                });
                filters.push({
                    type: "employee_type",
                    name: filterValue,
                    count: 0,
                    value: isPresent
                });

            }
            filters[filters.length - 1].count++;
        }
        return filters;

    }
    if (type == "employee_status") {
        candidates.sort(function(a, b) {
            if (a.employee_status && b.employee_status)
                var employee_statusA = a.employee_status.toLowerCase(),
                    employee_statusB = b.employee_status.toLowerCase()
            if (employee_statusA < employee_statusB) //sort string ascending
                return -1
            if (employee_statusA > employee_statusB)
                return 1
            return 0 //default return value (no sorting)
        });

        var filterValue = 'invalid_value';
        for (var i = 0, len = candidates.length; i < len; i++) {
            var candidate = candidates[i];
            var isPresent = false
            if (candidate.employee_status !== filterValue) {;

                filterValue = candidate.employee_status;
                incomingfilters.forEach(function(entry) {
                    if (entry.name == filterValue)

                        isPresent = true;



                });
                filters.push({
                    type: "employee_status",
                    name: filterValue,
                    count: 0,
                    value: isPresent
                });
            }
            filters[filters.length - 1].count++;
        }
        return filters;



    }

}




var manipulatefilters = function(selectedCandidates, forfilter, filters) {
    

var dbfilters = ["salary_expectation", "visa_status", "employee_status", "employee_type"];


    // var dbfilters=["salary_expectation","visa_status","employee_status","employee_type"];

    selectedCandidates.where(forfilter[0].type).in(getNames(forfilter));
    selectedCandidates.exec(function(err, candidates) {
        for (var x = 0; x < dbfilters.length; x++) {
            if (forfilter[0].type != dbfilters[x])
                filters = sortandfilter(dbfilters[x], candidates, forfilter, filters);
        }


    });




    return filters;
}