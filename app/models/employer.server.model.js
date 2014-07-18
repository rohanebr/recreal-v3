'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Company = mongoose.model('Company');

/**
 * Employer Schema
 */
var EmployerSchema = new Schema({
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
    type: 'String'
  },
  division:{
    type: 'String',
    trim: true
  },
  department:{
    type: 'String',
    trim: true
  },
  office_no:{
    type: 'String',
    trim: true
  },
  personal_no:{
    type: 'String',
    trim: true
  },
  skype_id:{
    type: 'String',
    trim: true
  },
  contact_email:{
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
	company: {
		type: Schema.ObjectId,
		ref: 'Company',
		// required: 'Cannot create an employer without a company'
	},
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

/**
 * Hook a pre save method to hash the password
 */
// EmployerSchema.pre('save', function(next) {
// 	console.log('pre called');
// 	var company = new Company();
// 	this.company = company;
// 	company.name = 'New Company';
// 	company.employers.push(this);
// 	company.save();

// 	next();
// });

mongoose.model('Employer', EmployerSchema);