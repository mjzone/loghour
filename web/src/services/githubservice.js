import axios from 'axios';
var USER_TOKEN = 'YOUR TOKEN HERE';
var instance = axios.create({
    baseURL: 'https://api.github.com/',
    headers: {
        'Authorization': 'token ' + USER_TOKEN //TO-DO dynamically aquiring the token
    }
});

//asume user token with either user scope or read:org
module.exports.getOrgList = function(userName) {
    //GET /users/:username/orgs

    return instance.get('users/' + userName + '/orgs'); //returns a promise

};

module.exports.getRepoList = function(name, type) {
    //type: 'users' | 'orgs'
    //GET /users/:username/repos
    //GET /orgs/:org/repos


    // axios.all([instance.get('users/rehrumesh/repos'), instance.get('orgs/99xt/repos')])
    // .then(axios.spread(function(acct, perms) {
    //     debugger;
    // }));
    //
    return instance.get("/"+type+"/"+name+"/repos");
};

module.exports.getIssuesOfRepo = function(repoOwner, repoName) {
    //GET /repos/:owner/:repo/issues?state=all  //default state: open
    return instance.get('repors/' + userName + '/' + repoName + "/issues?state=all");   //TO-DO test api call
};

module.exports.getCommentsOfIssue = function(repoOwner, repoName, issueId) {
    //GET /repos/:owner/:repo/issues/:issueId/comments
    return instance.get('repors/' + userName + '/' + repoName + "/issues/"+issueId+"/comments");     //TO-DO test api call
};
