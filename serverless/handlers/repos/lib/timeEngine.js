'use strict';

var Promise = require("bluebird"),
    _ = require('lodash'),
    mongodb = require('mongodb');

module.exports.issueTime = (comments) => {
    //TODO: Write the time calculation logic from comment with Regex Matching
    return 10;
};

module.exports.repoTime = (issues) => {
    return _.sumBy(issues, function(issue) {
        return issue.time_entry;
    });;
};
