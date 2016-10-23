'use strict';

var Promise = require("bluebird"),
    _ = require('lodash'),
    mongodb = require('mongodb'),
    timeEngine = require('./timeEngine'),
    processing = {
        issues: [],
        comments: []
    };

var includeIssues = (client, repo, filter) => {
    return new Promise(function(resolve, reject) {
        var ghrepo = client.repo(repo.full_name);
        ghrepo.issues({
            since: (new Date(filter.from)).toISOString()
        }, function(error, issues) {
            _.each(issues, function(issue) {
                if (issue.comments > 0) {
                    processing.comments.push(includeComments(client, repo, issue, filter.user));
                } else {
                    issue.time_entry = 0;
                }
            });
            Promise.all(processing.comments).then(function() {
                repo.issues = issues;
                repo.time_entry = timeEngine.repoTime(issues);
                error ? reject(error) : resolve(issues);
            });
        });
    });
};

var includeComments = (client, repo, issue, user) => {
    return new Promise(function(resolve, reject) {
        var ghissue = client.issue(repo.full_name, issue.number);
        ghissue.comments(function(error, comments) {
            issue.comments = !user ? comments : _.filter(comments, (comment) => {
                return comment.user.login.toLowerCase() === user.toLowerCase()
            });
            issue.time_entry = timeEngine.issueTime(comments);
            error ? reject(error) : resolve(comments);
        });
    });
};

module.exports.query = (client, repos, filter) => {
    _.each(repos, function(repo) {
        processing.issues.push(includeIssues(client, repo, filter));
    });
    return new Promise(function(resolve, reject) {
        Promise.all(processing.issues).then(function(error) {
            resolve(repos);
        });
    });
};
