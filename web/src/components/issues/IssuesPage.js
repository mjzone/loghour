import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import * as orgsActions from '../../actions/organizationActions';
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
        let {user, orgs} = this.props;
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
    orgs: PropTypes.array,
    userActions: PropTypes.object,
    orgActions: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
    return {
        user: state.user,
        orgs: state.organizations
    };
}

function mapActionsToDispatch(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        orgActions: bindActionCreators(orgsActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapActionsToDispatch)(IssuesPage);