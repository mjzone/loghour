import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import Select from 'react-select';
import GHService from '../services/githubservice';

const BASE_URL = 'http://localhost:3000';
var todos = [],
    options = [];

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
        var self = this;
        GHService.getOrgList('mjzone').then(function (data) { 
            self.setState({ organizations: ["org1", "org2", "org3"] });
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
         GHService.getOrgList('mjzone').then(function (data) { 
            self.setState({ repos: ["repo1", "repo2", "repo3", "repo4", "repo5"] });
             
        }, function (err) { console.log(err); });
    }

    renderRepos() {
        return _.map(this.state.repos, (repo, index) => <li><Link to={`organizations/${this.state.selectedOrg}/projects/${repo}`}>{repo}</Link></li>);
    }

    render() {
        var self = this;
        return (
            <div>
                <div className="row large-6 large-offset-5 medium-6 medium-offset-5 small-6 small-offset-5 columns">
                    <h1>Select your organization</h1>
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
