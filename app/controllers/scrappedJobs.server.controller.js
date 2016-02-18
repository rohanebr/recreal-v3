var mongoose = require('mongoose'),
ScrappedJob = mongoose.model('scrappedJob'),
    _ = require('lodash');



exports.read = function(req, res) {
    //Finds the details of the selected job
	ScrappedJob.findById(req.job._id).exec(function(err, job) {
         if(!err)
            {
          //Finds all the jobs from the company excluding the selected job
          ScrappedJob.find({ $and:[{company:req.job.company},{_id:{$ne:req.job._id}}]}).limit(5).exec(function(err,jobs){
                            
                           ScrappedJob.find({ $and:[{Industry:req.job.Industry},{_id:{$ne:req.job._id}}]}).limit(5).exec(function(err,relatedJobs){

                            
                            res.jsonp({job:job,companyOtherJobs:jobs,relatedJobs:relatedJobs});
          

                           });
                         


                    });
           
            
            
           
            }
     
   });
};

exports.scrappedjobByID = function(req, res, next, id) {
    ScrappedJob.findById(id).exec(function(err, job) {
        if (err) return next(err);
        if (!job) return next(new Error('Failed to load Job ' + id));
         req.job = job;
        next();
    });
};