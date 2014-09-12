'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

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
	  title:{
	    type: 'String',
	    trim: true
	  },
	  description:{
	    type: 'String'
	  },
	  requirement:{
	    type: 'String',
	    trim: true
	  },
	  responsibilities:{
	    type: 'String',
	    trim: true
	  },
	  due_date:{
	    type: 'date'
	  },
	  industry:{
	    type: 'String',
	    trim: true
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
	  location:{
	    type: 'String',
	    trim: true
	  },
	  country:{
	    type: 'String',
	    trim: true
	  },
	  job_status:{
	    type: 'String',
	    trim: true
	  },
	  degree_title:{
	    type: 'String',
	    trim: true
	  },
	  study_field:{
	    type: 'String',
	    trim: true
	  },
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
	  		type:'String',
	  		trim:true
	  		},
	  	level:{
	  		type:'String',
	  		trim:true
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
	candidates: [{
		type: Schema.ObjectId,
		ref: 'Candidate'
	}],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

JobSchema.index({candidates: 1});

// A couple of methods to save references inside the documents by using only
// the _id instead of creating a subdocument.

JobSchema.methods.apply = function(candidate, callback) {
	var job = this;
   	this.candidates.push(candidate);	
	this.save(function(err) {
		candidate.jobs.push(job);
		candidate.save(callback);
	});
};
		


mongoose.model('Job', JobSchema);