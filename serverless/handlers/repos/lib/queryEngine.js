'use strict';

var Promise = require("bluebird"),
    _ = require('lodash'),
    mongodb = require('mongodb'),
    timeEngine = require('./timeEngine'),
    processing = {
        issues: [],
        comments: []
    };

var filterIssues = (issues) => {
    return _.filter(issues, function(issue) {
        return issue.time_entry && issue.time_entry.total > 0;
    }) || [];
};

var processComments = (client, repo, issues, user) => {
    _.each(issues, function(issue) {
        issue.comments > 0 && processing.comments.push(includeComments(client, repo, issue, user));
    });
};

var includeIssues = (client, repo, filter) => {
    return new Promise(function(resolve, reject) {
        var ghrepo = client.repo(repo.full_name);
        ghrepo.issues({
            since: (new Date(filter.from)).toISOString()
        }, function(error, issues) {
            processComments(client, repo, issues, filter.user);
            Promise.all(processing.comments).then(function() {
                repo.issues = filterIssues(issues);
                repo.time_entry = timeEngine.repoTime(repo.issues);
                error ? reject(error) : resolve(repo.issues);
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
