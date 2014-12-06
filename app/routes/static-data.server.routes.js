'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
	var countries = require('../../app/controllers/country');
	app.route('/countries')
		.get(countries.list);

	app.route('/countries/:countryName')
		.get(countries.read);

	app.param('countryName', countries.countryByName);

};