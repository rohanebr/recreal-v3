'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Exam Schema
 */
var ExamSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill Exam name',
		trim: true
	},
	description:{
		type: String
	},
	passScore: {
		type: Number,
		default: 50
	},
	timeLimit: {
		type: Number,
		default: 30
	},
	category: {
		type: String
	},
	level:{
		type: Number,
		default: 1
	},

	questions: [{
		body: {
			type: String,
			default: '',
			required: 'Please write a question',
			trim: true
		},
		image_url:{
			type: String
		},

		answers: [{
			body: {
				type: String,
				default: '',
				required: 'Please write an answer',
				trim: true
			},
			weight: {
				type: Number,
				default: 0
			},
			image_url:{
				type: String
			}
		}]

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

mongoose.model('Exam', ExamSchema);