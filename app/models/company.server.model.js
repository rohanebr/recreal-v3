'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Company Schema
 */
var CompanySchema = new Schema({
	// name: {
	// 	type: String,
	// 	default: '',
	// 	// required: 'Please fill Company name',
	// 	// trim: true
	// },
  company_name:{
    type: 'String',
    trim: true
  },
  logo_url:{
    type: 'String'
  },
  website:{
    type: 'String',
    trim: true
  },
  industry:{
    type: 'String',
    trim: true
  },
  company_type:{
    type: 'String',
    trim: true
  },
  address:{
    type: 'String',
    trim: true
  },
  compnay_size:{
    type: 'String',
    trim: true
  },
  founded:{
    type: 'date'
  },
  contact_email:{
    type: 'String',
    trim: true
  },
  contact_no:{
    type: 'String',
    trim: true
  },
  contact_person:{
    type: 'String',
    trim: true
  },
  specialties:[{
    name:{
      type: 'String',
      trim: true
      }
  }],
	employers: [{
		type: Schema.ObjectId,
		ref: 'Employer'
	}],
	jobs: [{
		type: Schema.ObjectId,
		ref: 'Job'
	}],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Company', CompanySchema);