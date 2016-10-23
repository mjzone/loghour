'use strict';

var setup = require('../setup'),
    github = require('octonode');

module.exports.handler = (event, context, cb) => {
    setup(event);

    github.auth.config({
        id: process.env.GITHUB_ID,
        secret: process.env.GITHUB_SECRET
    });

    github.auth.login(event.params.code, function(err, token) {
        var client = github.client(token),
            ghme = client.me(),
            response = {
                token: token
            };
        var callback = (type, data) => {
            response[type] = data;
            if (response.orgs && response.user) {
                context.succeed(response);
            }
        };
        ghme.info((err, user) => {
            callback('user', user);
        });
        ghme.orgs((err, orgs) => {
            callback('orgs', orgs);
        });
    });
};
