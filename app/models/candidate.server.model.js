'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Candidate Schema
 */
var CandidateSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: ''
	},
	lastName: {
		type: String,
		trim: true,
		default: ''
	},
	displayName: {
		type: String,
		trim: true
	},
	title:{
		type: 'String',
		trim: true
	},
	picture_url:{
		type: 'String',
		default: '/uploads/fullsize/no-image.jpg'
	},
	objective:{
		type: 'String',
		trim: true
	},
	address:{
		type: 'String',
		trim: true
	},
	country:{
		type: 'String',
		trim: true
	},
	location:{
		type: 'String',
		trim: true
	},
	contact_no:{
		type: 'String',
		trim: true
	},
	skype_name:{
		type: 'String',
		trim: true
	},
	gender:{
		type: 'bool'
	},
	visa_status:{
		type: 'String',
		trim: true
	},
	driving_license_issued:{
		type: 'String',
		trim: true
	},
	xp:{
		type: 'Number'
	},
	rating:{
		type: 'String',
		trim: true
	},
	target_job_title:{
		type: 'String',
		trim: true
	},
	career_level:{
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
	salary_expectation:{
		type: 'String',
		trim: true
	},
	notice_period:{
		type: 'String',
		trim: true
	},
	target_industries: [{
		name:{
			type: 'String',
			trim: true
	  	}
	}],
	target_locations: [{
		name:{
			type: 'String',
			trim: true
	  	}
	}],
	educations:[{
		degree:{
			type: 'String',
			trim: true
		},
		study_feild:{
			type: 'String',
			trim: true
	  	},
		notes:{
		  type: 'String',
		  trim: true
		  },
		institute:{
		  type: 'String',
		  trim: true
		},
		start_date:{
		  type: 'Date'
		}, 
		end_date:{
		  type: 'Date'
		}
	}],
	positions:[{
		company_name:{
		  type: 'String',
		  trim: true
		},
		title:{
		  type: 'String',
		  trim: true
		},
		summary:{
		  type: 'String',
		  trim: true
		},
		company_location:{
		  type: 'String',
		  trim: true
		},
		company_industry:{
		  type: 'String',
		  trim: true
		},
		start_date:{
		  type: 'Date'
		}, 
		end_date:{
		  type: 'Date'
		},
		is_current:{
		  type: 'Boolean'
		}
	}],
	skills:[{
		title:{
		  type: 'String',
		  trim: true
		},
		level:{
		  type: 'String',
		  trim: true
		},
		experience:{
		  type: 'Number'
		},
		last_used:{
		  type: 'Date'
		}
	}],
	projects:[{
		name:{
		  type: 'String',
		  trim: true
		},
		company:{
		  type: 'String',
		  trim: true
		},
		description:{
		  type: 'String',
		  trim: true
		},
		start_date:{
		  type: 'Date'
		}, 
		end_date:{
		  type: 'Date'
		}
	}],
	languages:[{
		name:{
		  type: 'String',
		  trim: true
		},
		proficiency:{
		  type: 'String',
		  trim: true
		}
	}],
	certificates:[{
		name:{
		  type: 'String',
		  trim: true
		}
	}],
	nationalities:[{
		name:{
		  type: 'String',
		  trim: true
		}
	}],
	created: {
		type: Date,
		default: Date.now
	},
	jobs: [{
		type: Schema.ObjectId,
		ref: 'Job'
	}],

	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true
	}
});

CandidateSchema.index({jobs: 1});

mongoose.model('Candidate', CandidateSchema);