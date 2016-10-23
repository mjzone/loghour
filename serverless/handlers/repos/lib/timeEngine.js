'use strict';

var Promise = require("bluebird"),
    _ = require('lodash'),
    mongodb = require('mongodb');

var getHours = (text) => {
    return text.match(/(\s|\b)[0-9]*\.?[0-9]+h(\s|$|[0-9]+m)/g) || [];
};

var getMinutes = (text) => {
    return text.match(/(\s|\b|[0-9]+h)[0-9]+m(\s|$)/g) || [];
};

var countHours = (text) => {
    var hours = getHours(text);
    return _.sumBy(hours, function(hour) {
        return Number(hour.match(/[0-9]*\.?[0-9]+/));
    }) || 0;
};

var countMinutes = (text) => {
    var minutes = getMinutes(text);
    return (_.sumBy(minutes, function(minute) {
        return Number(_.first(minute.match(/[0-9]+m/)).match(/[0-9]+/));
    }) / 60) || 0;
};

module.exports.hasTimeRecords = (text) => {
    return !!(getHours(text).length || getMinutes(text).length);
};

module.exports.repoTime = (comments) => {
    return {
        total: _.sumBy(comments, function(comment) {
            return countHours(comment.body) + countMinutes(comment.body);
        })
    };
};

module.exports.totalTime = (repos) => {
    //TODO: Write logic to calculate repoTime by individual Day
    return {
        total: _.sumBy(repos, function(repo) {
            return repo.time_entry.total;
        })
    };
};
