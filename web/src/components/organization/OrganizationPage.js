import _ from 'lodash';
import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import store from 'store';
import { bindActionCreators } from 'redux';
import * as types from '../../actions/actionTypes';
import * as userActions from '../../actions/userActions';
import * as orgsActions from '../../actions/orgsActions';
import * as orgActions from '../../actions/orgActions';

class OrganizationPage extends React.Component{
    selectOrg(org){
      store.set('org', org);
    }
    render() {
        let {user, orgs, org} = this.props;
        return (
            <div>
                <h2> Organizations </h2>
                {_.map(orgs, (org) => <h3 key={org.id} ><Link key={org.id} to={'/issues/' + org.login} onClick={() => this.selectOrg(org)}>{org.login}</Link></h3>)}
                {this.props.children}
            </div>
        );
    }
}

OrganizationPage.propTypes = {
    children: PropTypes.object,
    org: PropTypes.object,
    user: PropTypes.object,
    orgs: PropTypes.array,
    userActions: PropTypes.object,
    orgActions: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
    return {
        user: state.user,
        org: state.org,
        orgs: state.orgs
    };
}

function mapActionsToDispatch(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        orgActions: bindActionCreators(orgsActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapActionsToDispatch)(OrganizationPage);
