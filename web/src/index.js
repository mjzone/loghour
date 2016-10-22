import React from 'react';
import {render} from 'react-dom';
import App from 'components/app';
import Login from 'components/login';
import Organization from 'components/organization';
import ProjectList from 'components/project-list';
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
        replace('/organization');
    }
    next();
};

render(
    <Router history={hashHistory}>
        <Route path="/login" component={Login}  onEnter={redirectIfLoggedIn}/>
        <Route path="/" component={App} onEnter={requireLogin}>            
            <Route path="/organization" component={Organization} />
            <Route path="/organization/:orgId/projects" component={ProjectList} />
            <Route path="/projects/:projectId" component={ProjectListItem} />            
        </Route>
    </Router>,
    document.getElementById('app')
);

