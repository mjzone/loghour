'use strict';

var Promise = require("bluebird"),
    _ = require('lodash'),
    mongodb = require('mongodb'),
    timeEngine = require('./timeEngine'),
    pendingRequests = [];

var project = (collection, attributes) => {
    return _.map(collection, (item) => {
        return _.pick(item, attributes);
    });
};

var processComments = (client, repo, issues, filter) => {
    _.each(issues, function(issue) {
        issue.comments > 0 && processing.comments.push(includeComments(client, repo, issue, filter));
    });
};

var filterComments = (comments, filter) => {
    return _.filter(comments, (comment) => {
        return timeEngine.hasTimeRecords(comment.body) && comment.user.login.toLowerCase() === filter.user.toLowerCase()
    });
};

var processComments = (github, repo, filter) => {
    return new Promise(function(resolve, reject) {
        github.issues.getCommentsForRepo({
            owner: filter.org,
            repo: repo.name,
            since: (new Date(filter.from)).toISOString()
        }, function(error, comments) {
            comments = filterComments(comments, filter);
            comments = project(comments, ['id', 'html_url', 'created_at', 'updated_at', 'body']);
            repo.comments = comments;
            repo.time_logs = timeEngine.repoTime(comments, filter);
            error ? reject(error) : resolve(comments);
        });
    });
};


module.exports.query = (github, repos, filter) => {
    _.each(repos, (repo) => {
        pendingRequests.push(processComments(github, repo, filter));
    });

    return new Promise(function(resolve, reject) {
        Promise.all(pendingRequests).then(function(error) {
            resolve(repos);
        });
    });
};
