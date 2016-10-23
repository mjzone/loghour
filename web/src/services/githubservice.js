import axios from 'axios';
var USER_TOKEN = "b5d99930784b85c51e44d87263199abbcedfa035";
var instance = axios.create({
    baseURL: 'https://api.github.com/',
    headers: {
        'Authorization': 'token ' + USER_TOKEN 
    }
});

module.exports.getToken = (code) => axios.get('https://19xickfd0c.execute-api.eu-west-1.amazonaws.com/dev/authorize/'+ code);
    
module.exports.getOrgList = (userName) => instance.get('users/' + userName + '/orgs');

module.exports.getRepoList = (orgName) => instance.get("orgs/"+orgName+"/repos");

module.exports.getIssuesOfRepo = (userName, repoName) => instance.get('repos/' + userName + '/' + repoName + "/issues?state=all");  

module.exports.getCommentsOfIssue = (repoOwner, repoName, issueId) => instance.get('repos/' + userName + '/' + repoName + "/issues/"+issueId+"/comments");    

