'use strict';

/**
 * Module dependencies.
 */

var passport = require('passport');
var messages = require('../../app/controllers/messages');
var users = require('../../app/controllers/users');
module.exports = function(app) {
app.route('/getAllMessagesWithFlagForUnread/:userId')
		.get(messages.getMessagesWithFlagForNewMessages);





app.param('userId', users.userByID);
}