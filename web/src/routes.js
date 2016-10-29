import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import OrganizationPage from './components/organization/OrganizationPage';
import IssuesPage from './components/issues/IssuesPage';

let requireLogin = (nextState, replace, next) => {
    if (!localStorage.getItem('token')) {
        replace('/');
    }
    next();
};

export default (
    <Route path="/" component={App}>
        <Route path="/organizations" component={OrganizationPage} onEnter={requireLogin}>
            <Route path="/issues" component={IssuesPage}></Route>
        </Route>
    </Route>
);