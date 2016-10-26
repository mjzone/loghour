import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as organizationActions from '../../actions/organizationActions';
import OrganizationList from './OrganizationList';

class OrganizationsPage extends React.Component{
    constructor(props, context) {
        super(props, context);
    }

    organizationRow(organization, index) {
        return <div key={index}>{organization.title}</div>;
    }

    render() {
        const {organizations} = this.props;
        return (
            <div>
                <h1> Organizations </h1>
            </div>
        );
    }
}

// prop types validation
OrganizationsPage.propTypes = {
    organizations: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// mapping props to the component from the store
function mapStates(state, ownProps) {
    return {
        organizations: state.organizations
    };
}

// mapping actions for the component
function mapActions(dispatch) {
    return {
        actions: bindActionCreators(organizationActions, dispatch)
    };
}

export default connect(mapStates, mapActions)(OrganizationsPage);