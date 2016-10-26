import React, { PropTypes } from 'react';
import OrganizationListRow from './OrganizationListRow';

const OrganizationList = organizations => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>Title</th>
                    <th>Author</th>
                </tr>
            </thead>
            <tbody>
                {organizations.map(organization =>
                    <OrganizationListRow key={organization.id} organization={organization} />
                )}
            </tbody>
        </table>
    )
}

OrganizationList.propTypes = {
    organizations: PropTypes.array.isRequired
};

export default OrganizationList;