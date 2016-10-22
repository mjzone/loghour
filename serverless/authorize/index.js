'use strict';

var github = require('octonode'),
    env = require('dotenv').config();

module.exports.handler = (event, context, cb) => {
    event.params = JSON.parse(event.params || "{}");

    github.auth.config({
        id: process.env.GITHUB_ID,
        secret: process.env.GITHUB_SECRET
    });
    
    github.auth.login(event.params.code, function(err, token) {
        context.succeed({
            token: token
        });
    });
};
