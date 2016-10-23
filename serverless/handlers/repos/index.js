'use strict';

var setup = require('../setup'),
    queryEngine = require('./lib/queryEngine'),
    github = require('octonode');

module.exports.handler = (event, context, cb) => {
    setup(event);

    var client = github.client(event.auth.token);
    var ghuser = client.user(event.params.org);
    ghuser.repos(function(err, repos) {
        queryEngine.query(client, repos, {
            from: event.params.from,
            to: event.params.to
        }).then(function(queriedRepos) {
            context.succeed(queriedRepos);
        })
    });
};
