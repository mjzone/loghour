'use strict';

require('dotenv').config();

module.exports = function(event) {
    event.params = JSON.parse(event.params || "{}");
    event.headers = JSON.parse(event.headers || "{}");
    event.auth = {
        token: event.headers.Authorization
    };
};
