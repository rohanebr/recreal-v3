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
  title:{
    type: 'String',
    trim: true
  },
  created_date: {
    type: Date,
    default: Date.now
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
  role:{
  type: String,
    enum: ['Admin', 'Viewer','Restricted'],
    default:'Admin'

  },

  skype_id:{
    type: 'String',
    trim: true
  },
  contact_email:{
    type: 'String',
    trim: true
  },
  favorites: [{
   candidate: {
     type: Schema.ObjectId,
     ref: 'Candidate'
   },
   job: {
     type: Schema.ObjectId,
     ref: 'Job'
   }
  }],
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

EmployerSchema.set('toJSON', { virtuals: true });

EmployerSchema.virtual('displayName').get(function () {
  
  return this.user.displayName;
});

EmployerSchema.virtual('picture_url').get(function () {
  return this.user.picture_url;
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

EmployerSchema.methods.addToFavorites = function(candidate, job, callback) {
  var employer = this;
  var favoriteCandidate = {
    candidate: candidate,
    job: job
  };
    this.favorites.push(favoriteCandidate);  
    this.save(callback);
};

mongoose.model('Employer', EmployerSchema);