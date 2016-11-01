import React, { PropTypes } from 'react';
import Login from './login/LoginPage';
import Header from './common/Header';
import store from 'store';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions';
import * as orgsActions from '../actions/orgsActions';
import * as orgActions from '../actions/orgActions';
import * as api from '../services/githubService';

class App extends React.Component{
    constructor(props, context){
        super(props, context);
        this.initialize = this.initialize.bind(this);
        this.logout = this.logout.bind(this);
    }

    setupAuthToken(token){
        axios.defaults.headers.common['Authorization'] = store.get('token');
    }

    componentWillMount(){
            if(store.get('token')){
                this.initialize();
            }
            else if(this.props.location.query.code){
               api.getToken(this.props.location.query.code).then(
                (result) => {
                    store.set('token', result.data.token);
                    store.set('user', result.data.user);
                    store.set('orgs', result.data.orgs);
                    store.set('org', result.data.org);
                    this.initialize();
                }, (err) => {
                    throw ('Error: '+ err);
                }
            );
        }
    }

    initialize(){
        this.props.userActions.setUserState(store.get('user'));
        this.props.orgsActions.setOrgsState(store.get('orgs'));
        this.props.orgActions.selectOrgState(store.get('org'));
        this.setupAuthToken(store.get('token'));
        this.redirect();
    }

    redirect(){
      if(store.get('org')){
        this.context.router.push('/issues/' + store.get('org').login);
      }else{
        this.context.router.push('/organizations');
      }
    }

    logout(){
        store.clear();
        this.context.router.push('/');
    }

    render() {
        let {user, orgs, org} = this.props;
        if (!store.get('token')) {
            return <Login/>;
        }
        return (
            <div>
                <Header logout={this.logout} user={this.props.user} selectedOrg={this.props.org}/>
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object,
    user: PropTypes.object,
    org: PropTypes.object,
    orgs: PropTypes.array,
    location: PropTypes.object,
    userActions: PropTypes.object,
    orgActions: PropTypes.object
};

App.contextTypes = {
    router: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
    return {
        user: state.user,
        org: state.org,
        orgs: state.orgs
    };
}

function mapActionsToDispatch(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        orgActions: bindActionCreators(orgActions, dispatch),
        orgsActions: bindActionCreators(orgsActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapActionsToDispatch)(App);
