'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Candidate = mongoose.model('Candidate'),
Schema = mongoose.Schema,
 searchPlugin = require('mongoose-search-plugin');

/**
 * Job Schema
 */
 
var JobSchema = new Schema({
	// name: {
	// 	type: String,
	// 	default: '',
	// 	required: 'Please fill Job name',
	// 	trim: true
	// },

	industry:{
		type: 'String',
		trim: true
	},
	job_role:{
		type: 'String',
		trim: true
	},
	title:{
		type: 'String',
		trim: true
	},
	location:{
		type: 'String',
		trim: true
	},
	views: [{
       type:Schema.ObjectId,
       ref: 'User'
    }],
	description:{
	    type: 'String'
	  },
	coordinates:{
		latitude:{
         	type:Number,
           	default:0
           },
        longitude:{
           	type:Number,
           	default:0
           }
	  },
	requirement:{
	    type: 'String',
	    trim: true
	  },
	responsibilities:[{
	  	name: {
	  		type:'String',
	  		trim: true
	  		}
	}],
	  due_date:{
	    type: 'date'
	  },
	  department:{
	    type: 'String',
	    trim: true
	  },
	  gender:{
	  	type: 'String',
	    trim: true
	  },
	  work_permit:{
	  	type: 'String',
	    trim: true
	  },
	  salary_range:{
	    type: 'String',
	    trim: true
	  },
	  employee_type:{
	    type: 'String',
	    trim: true
	  },
	  visa_status:{
	    type: 'String',
	    trim: true
	  },
	  employee_status:{
	    type: 'String',
	    trim: true
	  },
	  shift:{
	    type: 'String',
	    trim: true
	  },
	  no_of_positions:{
	    type: 'Number'
	  },
	  travel_required:{
	    type: 'String',
	    trim: true
	  },
	 
	  country:{
	    type: 'String',
	    trim: true
	  },
	  city:{
	  	type:'String',
	  	trim:true
	  },
	  job_status:{
	    type: 'String',
	    trim: true
	  },
	  educations:[{
    	degree_title:{
      		type: 'String',
      		trim: true
      	},
      	study_feild:{
      		type: 'String',
      		trim: true
      	},
      	priority:{
      		type: 'String',
      		trim: true
      	}
  	}],
  	qualifications:[{
    	name:{
      		type: 'String',
      		trim: true
      	},
      	priority:{
      		type: 'String',
      		trim: true
      	}
  	}],
	  career_level:{
	    type: 'String',
	    trim: true
	  },
	  experience:{
	    type: 'Number'
	  },
	  certificates:[{
	  	name: {
	  		type:'String',
	  		trim: true
	  		}
		}],
	  skills:[{
    	title:{
      		type: 'String',
      		trim: true
      	},
      	priority:{
      		type: 'String',
      		trim: true
      	}
  	  }],
	  tags:[{
	  	name:{
	  		type:'String'
	  		}
	  	}],
	created: {
		type: Date,
		default: Date.now
	},	
	employer: { 
		type: Schema.ObjectId,
		ref: 'Employer',
		required: 'Jobs can only be posted from Employer accounts'
	},
	company: {
		type: Schema.ObjectId,
		ref: 'Company'
	},
	exams: [{
		type: Schema.ObjectId,
		ref: 'Exam'
	}],

	stages: [{
		type: String
	}],

	jobApplications: [{
		candidate: {
			type: Schema.ObjectId,
			ref: 'Candidate'
		},
		stage:{
	      	type: String
	    },
	    coverLetter: {
	    	title: {
	    		type: String
	    	},
	    	content: {
	    		type: String
	    	}
	    }
	    // comments: [{

	    // }]
	}],

	// candidates: [{
	// 	type: Schema.ObjectId,
	// 	ref: 'Candidate'
	// }],
	// shortListedCandidates: [{
	// 	candidate: {
	// 		type: Schema.ObjectId,
	// 		ref: 'Candidate'
	// 	},
	// 	employer: {
	// 		type: Schema.ObjectId,
	// 		ref: 'Employer'
	// 	}
	// }],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	stage:{
      type: String,
  	enum: ['JobOne','JobTwo','JobLocation','Active'],
  	default:'JobOne'
    }


	
});

JobSchema.plugin(searchPlugin, {
    fields: ['title', 'location','department','skills']
  });
JobSchema.index({candidates: 1});




JobSchema.pre('save', function(next) {
	if (!(this.stages.length > 0))  // only first time
	{
		this.stages = ['Unscreened','Screening', 'Shortlist', 'Test', 'Telephone Interview', 'Interview', 'Rejected', 'Hired'];
	}
	next();
});


//two below lines added for text saerch plugin remove if not required




// A couple of methods to save references inside the documents by using only
// the _id instead of creating a subdocument.

JobSchema.methods.apply = function(candidate, callback) {
	var job = this;
	var jobApplication = {
		candidate: candidate,
		stage: job.stages[0]
	}
	this.jobApplications.push(jobApplication)
   	// this.candidates.push(candidate);	
	this.save(function(err) {
		candidate.jobs.push(job);
		candidate.save(callback);
	});
};

mongoose.model('Job', JobSchema);



