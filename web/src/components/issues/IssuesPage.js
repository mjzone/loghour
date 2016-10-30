import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import * as orgActions from '../../actions/orgActions';
import * as api from '../../services/githubService';

class IssuesPage extends React.Component{
    componentWillMount(){
        api.getIssues().then(
            (result) => {
                debugger;
              }, (err) => {
                  throw ('Error: '+ err);
            });
    }

    render() {
        let {user, org} = this.props;
        return (
            <div>
                <h2> Follwing are the issues list </h2>
            </div>
        );
    }
}

IssuesPage.propTypes = {
    children: PropTypes.object,
    user: PropTypes.object,
    org: PropTypes.object,
    userActions: PropTypes.object,
    orgActions: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
    return {
        user: state.user,
        org: state.org
    };
}

function mapActionsToDispatch(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        orgActions: bindActionCreators(orgActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapActionsToDispatch)(IssuesPage);
