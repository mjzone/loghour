import React from 'react';
import {render} from 'react-dom';
import App from 'components/app';
import Login from 'components/login';
import Organizations from 'components/organizations';
import ProjectListItem from 'components/project-list-item';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import actions from 'actions/actions';
import GHService from 'services/githubservice';

var requireLogin = (nextState, replace, next) => {
    let code = nextState.location.query.code;
    // move this insid the code block
    localStorage.setItem('token', 'b5d99930784b85c51e44d87263199abbcedfa035');
    localStorage.setItem('userName', 'rehrumesh');
    if (code) {
        GHService.getToken(code).then(function (response) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userName', response.user.login);
        }, function (err) { console.log(err);});
       
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
            <Route path="/organizations/:orgId/repos/:repoId" component={ProjectListItem} />            
        </Route>
    </Router>,
    document.getElementById('app')
);

