import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as store from 'store';
import App from './components/App';
import OrganizationPage from './components/organization/OrganizationPage';
import IssuesPage from './components/issues/IssuesPage';
import Login from './components/login/LoginPage';
import Header from './components/common/Header';
import Auth from './components/auth/Authenticate';

let requireLogin = (nextState, replace, next) => {
    if (!store.get('token')) {
        replace('/login');
    }
    next();
};

export default (
    <div>
    <Route path="/login" component={Login}></Route>
    <Route path="/authenticate" component={Auth}></Route>
    <Route path="/" component={App}>
        <IndexRoute component={Header}/>
        <Route path="/organizations" component={OrganizationPage} onEnter={requireLogin}>
            <Route path="/issues/:orgId" component={IssuesPage}/>
        </Route>
    </Route>
    </div>
);
