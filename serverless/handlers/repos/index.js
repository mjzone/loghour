'use strict';

var github = require('octonode'),
    eventParse = require('../eventParse'),
    env = require('dotenv').config();

module.exports.handler = (event, context, cb) => {
    eventParse(event);

    var client = github.client(event.auth.token);
    var ghuser = client.user(event.params.org);

    ghuser.repos(function(err, org) {
        context.succeed(org);
    });
};
