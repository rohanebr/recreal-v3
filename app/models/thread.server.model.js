'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Thread Schema
 */
var ThreadSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
	sender: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	receiver: {
		type: Schema.ObjectId,
		ref: 'User'
	},		
	subject:{
		type: String
  		},
	messages:[{
		messageBody:{
			type: String 
		},
		created: {
 		type: Date,
		default: Date.now
		}
	}]
});

mongoose.model('Thread', ThreadSchema);