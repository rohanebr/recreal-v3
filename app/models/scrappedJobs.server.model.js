'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Schema = mongoose.Schema,
searchPlugin = require('mongoose-search-plugin');




var scrappedJobSchema = new Schema({


  title:{
         type: 'String',
		trim: true
    },
    image:{
         type: 'String',
    trim: true
    },
	Industry:{
		type: 'String',
		trim: true
	},
	company:{
        type: 'String',
		trim: true
    },
    FunctionalArea:{
    	type: 'String',
		trim: true
    },
    TotalPosition:{
        type: 'String',
		trim: true
    },
    JobType:{
		type: 'String',
		trim: true
    },
    department:{
		type: 'String',
		trim: true
   },
   JobLocation:{
	   	type: 'String',
		trim: true
   },
   JobLat:{ type: 'String',
    trim: true},
   JobLng:{ type: 'String',
    trim: true},
   Age:{
		type: 'String',
		trim: true
   },
   Gender:{
	   	type: 'String',
		trim: true
   },
   MinimumEducation:{
		type: 'String',
		trim: true
   },
   degree:{
	   	type: 'String',
		trim: true
   },
   CareerLevel:{
		type: 'String',
		trim: true
   },
   SalaryRange:{
   		type: 'String',
		trim: true
   },
   MinimumExperience:{
	   	type: 'String',
		trim: true
  },
  ApplyBy:{
	  type: Date,
    default: Date.now
  },
  PostedDate:{
    	type: Date,
    default: Date.now
  },
  description:{
  	    type: 'String',
		trim: true
  },
  url:{
     	type: 'String',
		trim: true

  },
  views: 
      [{
       type:Schema.ObjectId,
       ref: 'User'
    }]
    



});
scrappedJobSchema.plugin(searchPlugin, {
    fields: ['title', 'JobLocation','department','description','degree','FunctionalArea','Industry','company','JobType','CareerLevel']
  });
mongoose.model('scrappedJob', scrappedJobSchema);


