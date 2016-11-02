import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as store from 'store';
import App from './components/App';
import OrganizationPage from './components/organization/OrganizationPage';
import IssuesPage from './components/issues/IssuesPage';

let requireLogin = (nextState, replace, next) => {
    if (!store.get('token')) {
        replace('/');
    }
    next();
};

export default (
    <Route path="/" component={App}>
        <Route path="/organizations" component={OrganizationPage} onEnter={requireLogin}>
            <Route path="/issues/:orgId" component={IssuesPage}/>
        </Route>
    </Route>
);
