'use strict';

var github = require('octonode'),
    eventParse = require('../eventParse'),
    env = require('dotenv').config();

module.exports.handler = (event, context, cb) => {
    eventParse(event);

    var client = github.client(event.headers.Authorization);
    var ghme = client.me();

    ghme.info(function(err, user, headers) {
        var ghuser = client.user(user.login);
        ghuser.orgs(function(err, orgs) {
            context.succeed({
                orgs: orgs,
                user: user
            });
        });
    });
};
