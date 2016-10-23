'use strict';

var Promise = require("bluebird"),
    _ = require('lodash'),
    mongodb = require('mongodb');

var countHours = function(text) {
    var hours = text.match(/(\s|\b)[0-9]*\.?[0-9]+h(\s|$|[0-9]+m)/g) || [];
    return _.sumBy(hours, function(hour) {
        return Number(hour.match(/[0-9]*\.?[0-9]+/));
    }) || 0;
};

var countMinutes = function(text) {
    var minutes = text.match(/(\s|\b|[0-9]+h)[0-9]+m(\s|$)/g) || [];
    return (_.sumBy(minutes, function(minute) {
        return Number(_.first(minute.match(/[0-9]+m/)).match(/[0-9]+/));
    }) / 60) || 0;
};

module.exports.issueTime = (comments) => {
    return {
        total: _.sumBy(comments, function(comment) {
            return countHours(comment.body) + countMinutes(comment.body);
        })
    };
};

module.exports.repoTime = (issues) => {
    //TODO: Write logic to calculate repoTime by individual Day
    return {
        total: _.sumBy(issues, function(issue) {
            return issue.time_entry.total;
        })
    };
};
