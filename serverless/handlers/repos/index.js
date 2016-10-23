'use strict';

var setup = require('../setup'),
    github = require('octonode');

module.exports.handler = (event, context, cb) => {
    setup(event);

    var client = github.client(event.auth.token);
    var ghuser = client.user(event.params.org);

    ghuser.repos(function(err, org) {
        context.succeed(org);
    });
};
