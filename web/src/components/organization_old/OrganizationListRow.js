import React, { PropTypes } from 'react';
import {Link} from 'react-router';

const OrganizationListRow = organization => {
    return (
        <tr>
            <td><a href={organization.url} target="_blank">View on Github</a></td>
            <td><Link to={'/organization/' + organization.id}>{organization.title}</Link></td>
        </tr>
    );
};

OrganizationListRow.propTypes = {
    organization: PropTypes.object.isRequired
};

export default OrganizationListRow;