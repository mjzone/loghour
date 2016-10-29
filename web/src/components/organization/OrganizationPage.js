import _ from 'lodash';
import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import * as orgsActions from '../../actions/organizationActions';

class OrganizationPage extends React.Component{
    render() {
        let {user, orgs} = this.props;
        return (
            <div>
                <h2> Organizations </h2>
                {_.map(orgs, (org, index) => <h3><Link key={index} to={'/issues'}>{org.login}</Link></h3>)}
                {this.props.children}
            </div>
        );
    }
}

OrganizationPage.propTypes = {
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

export default connect(mapStatesToProps, mapActionsToDispatch)(OrganizationPage);