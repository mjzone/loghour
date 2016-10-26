import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import OrganizationsPage from './components/organization/OrganizationsPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="organizations" component={OrganizationsPage}/>
        <Route path="about" component={AboutPage}/>
    </Route>  
);