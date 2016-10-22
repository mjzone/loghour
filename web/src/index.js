import React from 'react';
import {render} from 'react-dom';
import App from 'components/app';
import Login from 'components/login';
import Organizations from 'components/organizations';
import ProjectListItem from 'components/project-list-item';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import actions from 'actions/actions';

var requireLogin = (nextState, replace, next) => {
    if (nextState.location.query.code) {
        // get token from server
        localStorage.setItem('token', 'abcd1234');
    }
    if (!localStorage.getItem('token') && !nextState.location.query.code) {
        replace('/login');
    }
    next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
    if (localStorage.getItem('token')) {
        replace('/organizations');
    }
    next();
};

render(
    <Router history={hashHistory}>
        <Route path="/login" component={Login} onEnter={redirectIfLoggedIn}/>
        <Route path="/" component={App} onEnter={requireLogin}>  
            <IndexRoute component={Organizations}/>  
            <Route path="/organizations" component={Organizations} />
            <Route path="/organizations/:orgId/projects/:projectId" component={ProjectListItem} />            
        </Route>
    </Router>,
    document.getElementById('app')
);

