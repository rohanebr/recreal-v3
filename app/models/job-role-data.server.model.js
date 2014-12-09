'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * JobRoleData Schema
 */
var JobRoleDataSchema = new Schema({
	// JobRoleData model fields   
	// ...
	// name:{
	//     type: 'String',
	//     trim: true
 //  	},
 //  	responsibilities:[{
 //    	name:{
 //      		type: 'String',
 //      		trim: true
 //      		}
 //  	}],
 //  	education:[{
 //    	degree_name:{
 //      		type: 'String',
 //      		trim: true
 //      		}
 //      	required:{
 //      		type: 'String',
 //      		trim: true
 //      		}
 //  	}],
 //  	qualifications:[{
 //    	name:{
 //      		type: 'String',
 //      		trim: true
 //      		}
 //      	required:{
 //      		type: 'String',
 //      		trim: true
 //      		}
 //  	}],
 //  	skills:[{
 //    	title:{
 //      		type: 'String',
 //      		trim: true
 //      		}
 //      	required:{
 //      		type: 'String',
 //      		trim: true
 //      		}
 //  	}]
});

mongoose.model('JobRoleData', JobRoleDataSchema);