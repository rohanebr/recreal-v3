'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * JobRoleData Schema
 */
var JobroleSchema = new Schema({
	// JobRoleData model fields   
	// ...
	name:{
	    type: 'String',
	    trim: true
  	},
  	responsibilities:[{
    	name:{
      		type: 'String',
      		trim: true
      	}
  	}],
  	educations:[{
    	degree_title:{
      		type: 'String',
      		trim: true
      	},
      	study_feild:{
      		type: 'String',
      		trim: true
      	},
      	priority:{
      		type: 'String',
      		trim: true
      	}
  	}],
  	qualifications:[{
    	name:{
      		type: 'String',
      		trim: true
      	},
      	priority:{
      		type: 'String',
      		trim: true
      	}
  	}],
  	skills:[{
    	title:{
      		type: 'String',
      		trim: true
      	},
      	priority:{
      		type: 'String',
      		trim: true
      	}
  	}]
});

mongoose.model('Jobrole', JobroleSchema);