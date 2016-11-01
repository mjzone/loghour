'use strict';

var Promise = require("bluebird"),
    _ = require('lodash'),
    mongodb = require('mongodb');

var getHours = (text) => {
    return text.match(/(\s|\b)[0-9]*\.?[0-9]+h\s?(\s|$|[0-9]+m)?(\(\d{4}-\d{1,2}-\d{1,2}\))?/g) || [];
};

var getMinutes = (text) => {
    return text.match(/(\s|\b|[0-9]+h)[0-9]+m(\s|$|\(\d{4}-\d{1,2}-\d{1,2}\))?/g) || [];
};

var dateFormat = function(date) {
    var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = date.getDate().toString();
    return date.getFullYear() + '-' + (mm[1] ? mm : '0' + mm) + '-' + (dd[1] ? dd : '0' + dd);
};

var diffInDays = (a, b) => {
    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

var isWithin = (check, from, to) => {
    return diffInDays(from, check) >= 0 && diffInDays(check, to) >= 0;
};

module.exports.hasTimeRecords = (text) => {
    return !!(getHours(text).length || getMinutes(text).length);
};

module.exports.repoTime = (comments, filter) => {
    var results = {}
    _.each(comments, (comment) => {
        var hours = getHours(comment.body),
            minutes = getMinutes(comment.body);
        comment.time_logs = {};
        _.each(hours, (hour) => {
            var hourCount = Number(_.first(hour.match(/[0-9]*\.?[0-9]+/))) || 0;
            var hourDate = new Date(_.first(hour.match(/\d{4}-\d{1,2}-\d{1,2}/)) || comment.created_at);

            if (isWithin(hourDate, new Date(filter.from), new Date(filter.to))) {
                var date = dateFormat(hourDate);
                comment.time_logs[date] = comment.time_logs[date] ? (comment.time_logs[date] + hourCount) : hourCount;
                results[date] = comment.time_logs[date];
            }
        });
        _.each(minutes, (minute) => {
            var minuteCount = (Number(_.first(minute.match(/[0-9]+m/)).match(/[0-9]+/)) / 60) || 0;
            var minuteDate = new Date(_.first(minute.match(/\d{4}-\d{1,2}-\d{1,2}/)) || comment.created_at);

            if (isWithin(minuteDate, new Date(filter.from), new Date(filter.to))) {
                var date = dateFormat(minuteDate);
                comment.time_logs[date] = comment.time_logs[date] ? (comment.time_logs[date] + minuteCount) : minuteCount;
                results[date] = comment.time_logs[date];
            }
        });
    })
    return results;
};
