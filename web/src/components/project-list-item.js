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
        var self = this;
        GHService.getOrgList('mjzone').then(function (data) { 
            self.setState({ issues: [{ name: "issue1" }, { name: "issue1" }, { name: "issue3" },{ name: "issue4" }] });
        }, function (err) { console.log(err); });
    }

    renderIssues() {
        return _.map(this.state.issues, (issue, index) => <li>{issue.name}</li>);
    }    

    render(){
        return (
            <div>
                <div className="row large-6 large-offset-5 medium-6 medium-offset-5 small-6 small-offset-5 columns">
                    {this.renderIssues()}
                </div>
            </div>            
        );
    }
}
