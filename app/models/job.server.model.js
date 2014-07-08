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
	name: {
		type: String,
		default: '',
		required: 'Please fill Job name',
		trim: true
	},
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