'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var threads = require('../../app/controllers/threads');

	// Threads Routes
	app.route('/threads')
		.get(threads.list)
		.post(users.requiresLogin, threads.create);

	app.route('/threads/getUserThreads/:userId')
		.get(threads.getUserThreads);

	app.route('/threads/:threadId')
		.get(threads.read)
		.put(users.requiresLogin, threads.hasAuthorization, threads.update)
		.delete(users.requiresLogin, threads.hasAuthorization, threads.delete);
		app.route('/threads/setRead/:threadId').put(threads.setRead);

	// Finish by binding the Thread middleware
	app.param('threadId', threads.threadByID);

	app.route('/threads/updateThread/:threadId').put(users.requiresLogin,  threads.updateThread);
    app.route('/threads/getUserThread/:threadId').put(threads.getUserThread);
};