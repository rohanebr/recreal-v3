'use strict';

module.exports = function(app) {
	
	var scrappedjobs = require('../../app/controllers/scrappedJobs');


	app.route('/scrappedjobs/:scrappedjobId')
		.get(scrappedjobs.read);

		app.param('scrappedjobId', scrappedjobs.scrappedjobByID);
	}