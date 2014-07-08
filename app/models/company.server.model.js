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
	name: {
		type: String,
		default: '',
		required: 'Please fill Company name',
		// trim: true
	},
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