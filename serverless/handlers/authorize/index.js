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

        var client = github.client(token);
        var ghme = client.me();

        ghme.info(function(err, user) {
            var ghuser = client.user(user.login);
            ghuser.orgs(function(err, orgs) {
                context.succeed({
                    token: token,
                    orgs: orgs,
                    user: user
                });
            });
        });
    });
};
