import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import Select from 'react-select';
import GHService from '../services/githubservice';

export default class Organizations extends React.Component {
    constructor(props) {
        super(props);
        var self = this;
        this.state = {
            organizations: [],
            repos: [],
            selectedOrg: null
        };
        this.init();
    }

    init() {
        let self = this;
        GHService.getOrgList('rehrumesh').then(function (response) { 
            let orgs = _.map(response.data, (org, idx) => org["login"]);
            self.setState({ organizations: orgs});
        }, function (err) { console.log(err); });
    }

    getOptions() {
        return _.map(this.state.organizations, (organization, index) => {
            return {
                "value": organization,
                "label": organization
            }
        });
    }

    orgHandler(org) {
        var self = this;
        this.setState({ selectedOrg: org.value });
        GHService.getRepoList(org.value).then(function (response) { 
            let repos = _.map(response.data, (repo, idx) => repo["name"]);
            self.setState({ repos: repos });
             
        }, function (err) { console.log(err); });
    }

    renderRepos() {
        return _.map(this.state.repos, (repo, index) => <li><Link to={`organizations/${this.state.selectedOrg}/repos/${repo}`}>{repo}</Link></li>);
    }
 
    render() {
        var self = this;
        return (
            <div>
                <div className="row large-6 large-offset-5 medium-6 medium-offset-5 small-6 small-offset-5 columns">
                    <h4>Select your organization</h4>
                    <Select
                        name="organizations-list"
                        value={self.state.selectedOrg}
                        options={self.getOptions()}
                        onChange={self.orgHandler.bind(self)}
                        />
                    <ul>
                        {this.renderRepos()}
                    </ul>    
                    {this.props.children}
                </div>              
            </div>            
        );
    }
}
