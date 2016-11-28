'use strict';

require('dotenv').config();

module.exports = function(event) {
    console.log("the event is,", event);
    event.params = JSON.parse(event.params || "{}");
  //  event.headers = JSON.parse(event.headers || "{Authorization: 9200cdc76f4089c481204b84364ea798375e65e8}");
    event.auth = {
        token: ""//event.headers.Authorization
    };
};
