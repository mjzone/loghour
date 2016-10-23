import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import GHService from '../services/githubservice';

export default class ProjectListItem extends React.Component {

    constructor(props) {
        super(props);
        var self = this;
        this.state = {
            issues: []
        };
        this.init();
    }

    init() {
        let self = this,
            userName = localStorage.getItem('userName'),
            {repoId} = this.props.params;
        GHService.getIssuesOfRepo(userName, repoId).then(function (response) { 
            let issues = _.map(response.data, (issue, index) => {
                return {
                    "title": issue["title"]
                };
            });
            self.setState({ issues: issues });
        }, function (err) { console.log(err); });
    }

    renderIssues() {
        return _.map(this.state.issues, (issue, index) => <li>{issue.title}</li>);
    }    

    render() {
        if(!this.state.issues.length){
            return (
                <div className="row large-6 large-offset-5 medium-6 medium-offset-5 small-6 small-offset-5 columns">
                    <h4>Issues List</h4>                   
                    <p>No issues are available.</p>
                </div>     
            );
        }else{
            return (
                <div className="row large-6 large-offset-5 medium-6 medium-offset-5 small-6 small-offset-5 columns">
                    <h4>Issues List</h4>                   
                    {this.renderIssues()}
                </div>         
        );
        }        
    }
}
