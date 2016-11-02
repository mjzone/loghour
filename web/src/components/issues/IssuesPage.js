import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import * as api from '../../services/githubService';

class IssuesPage extends React.Component{
    constructor(props) {
       super(props);
       this.state = { repos: [], reposQueryInProgress: false};
    }

    componentWillMount(){
        this.loadRepos({user : this.props.user.login, org: this.props.params.orgId,  from :'2016-10-01', to : '2016-10-31'});
    }

    componentWillReceiveProps(){
        this.loadRepos({user : this.props.user.login, org: this.props.params.orgId,  from :'2016-10-01', to : '2016-10-31'});
    }

        loadRepos(options){
      let state = this.state;
      api.getIssues(options).then(
          (result) => {
            this.setState({
                repos: result.data.length? result.data : []
            });
            }, (err) => {
                throw ('Error: '+ err);
      });
    }

    formatTime(time){
      let hours = Math.floor(time), minutes = Math.round(((time % 1) * 60));
      return (hours? hours + 'h ' : '')  + (minutes? minutes + 'm': '');
    }

    reposTotalCounts(repos){
      let result = {}, total = 0, format = this.formatTime;
      _.each(repos, function(repo) {
        let timeLogs = _.values(repo.time_logs), sum = 0;
        _.each(timeLogs, function(log) {
          sum = sum + log;
        });
        total = total + sum;
        result[repo.name] = format(sum);
      });
      return { repos: result, total: format(total) };
    }

    render() {
        let {user, params} = this.props, repos =  this.state.repos, counts = this.reposTotalCounts(this.state.repos);
        return (
          <div>
              <h2> Organization: {params.orgId} </h2>
              {_.map(repos, (repo) => <div key={repo.id} ><h3>{repo.name}</h3><span>Total: {counts.repos[repo.name]}</span></div>)}
              <hr/>
                <h3> Total: {counts.total} </h3>
              <hr/>
              {this.props.children}
          </div>
        );
    }
}

IssuesPage.propTypes = {
    children: PropTypes.object,
    user: PropTypes.object,
    userActions: PropTypes.object,
    params: PropTypes.objec
};

IssuesPage.contextTypes = {
  store: React.PropTypes.object
};

function mapStatesToProps(state, ownProps) {
    return {
        user: state.user
    };
}

function mapActionsToDispatch(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapActionsToDispatch)(IssuesPage);
