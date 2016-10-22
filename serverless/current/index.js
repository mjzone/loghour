'use strict';

var github = require('octonode'),
    env = require('dotenv').config();

module.exports.handler = (event, context, cb) => {
    event.params = JSON.parse(event.params || "{}");
    event.headers = JSON.parse(event.headers || "{}");

    var client = github.client(event.headers.Authorization);
    var ghme = client.me();

    ghme.info(function(err, user, headers) {
        var ghuser = client.user(user.login);
        ghuser.orgs(function(err, organizations) {
            context.succeed({
                organizations: organizations,
                user: user
            });
        });
    });


};
