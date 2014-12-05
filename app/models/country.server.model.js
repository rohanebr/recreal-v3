'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Country Schema
 */
var CountrySchema = new Schema({
	// Country model fields   
	// ...
	name:{
	    type: 'String',
	    trim: true
  },
  cities:[{
    name:{
      type: 'String',
      trim: true
      }
  }]
});

mongoose.model('Country', CountrySchema);