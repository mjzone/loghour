'use strict';

var parser = require('../parser'),
    request = require('request'),
    env = require('dotenv').config();

module.exports.handler = (event, context, cb) => {
    var event = parser.parseEvent(event);
    request('https://github.com/login/oauth/access_token?client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET + '&code=' + event.params.code,
        function(error, response, body) {
            if (!error && response.statusCode == 200 && body.indexOf("access_token") !== -1) {
                context.succeed({
                    response: body
                });
            } else {
                context.fail(body);
            }
        });
};
