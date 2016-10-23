'use strict';

var setup = require('../setup'),
    _ = require('lodash'),
    queryEngine = require('./lib/queryEngine'),
    github = new(require("github"));

module.exports.handler = (event, context, cb) => {
    setup(event);

    var project = (collection, attributes) => {
        return _.map(collection, (item) => {
            return _.pick(item, attributes);
        });
    };

    github.authenticate({
        type: "oauth",
        token: event.auth.token
    });

    github.repos.getForOrg({
        org: event.params.org,
        per_page: 100
    }, function(err, repos) {
        repos = project(repos, ['id', 'name', 'full_name', 'html_url', 'description']);
        queryEngine.query(github, repos, {
            org: event.params.org,
            user: event.params.user,
            from: event.params.from,
            to: event.params.to
        }).then((queriedRepos) => {
            var resultRepos = _.filter(queriedRepos, (repo) => {
              return repo.time_entry.total;
            })
            context.succeed(resultRepos);
        });
    });
};
