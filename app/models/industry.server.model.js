'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Industry Schema
 */
var IndustrySchema = new Schema({
	// Industry model fields   
	// ...
	name:{
	    type: 'String',
	    trim: true
  	},
	group:{
    	type: 'String',
    	trim: true
	},
	job_roles:[{
		type: Schema.ObjectId,
		ref: 'Jobrole'
	}]
});

mongoose.model('Industry', IndustrySchema);