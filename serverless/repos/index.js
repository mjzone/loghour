'use strict';

var github = require('octonode'),
    env = require('dotenv').config();

module.exports.handler = (event, context, cb) => {
    event.params = JSON.parse(event.params || "{}");
    event.headers = JSON.parse(event.headers || "{}");

    var client = github.client(event.headers.Authorization);
    var ghuser = client.user(event.params.org);
    
    ghuser.repos(function(err, org) {
        context.succeed(org);
    });

};
