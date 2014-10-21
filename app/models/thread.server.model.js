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
	readByReceiver: {
		type: Boolean,
		default: false
	},
	readBySender: {
        type: Boolean,
		default: false
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
		author: {
			type: Schema.ObjectId,
			ref: 'User'
		},
		created: {
 		type: Date,
		default: Date.now
		}
	}]
});

mongoose.model('Thread', ThreadSchema);