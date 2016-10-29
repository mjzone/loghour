import React, { PropTypes } from 'react';
import Login from './login/LoginPage';
import Header from './common/Header';
import store from 'store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions';
import * as orgsActions from '../actions/organizationActions';
import * as api from '../services/githubService';

class App extends React.Component{
    constructor(props, context){
        super(props, context);
        this.initialize = this.initialize.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentWillMount(){
            if(store.get('token')){
                this.initialize();
            }

            if(this.props.location.query.code){
               api.getToken(this.props.location.query.code).then(
                (result) => {
                    store.set('token', result.data.token);
                    store.set('user', result.data.user);
                    store.set('orgs', result.data.orgs);
                    this.initialize();
                }, (err) => {
                    throw ('Error: '+ err);
                }
            );
        }
    }

    initialize(){
        this.props.userActions.setUserState(store.get('user'));
        this.props.orgActions.setOrgsState(store.get('orgs'));
        this.context.router.push('/organizations');
    }

    logout(){
        store.clear();
        this.context.router.push('/');
    }

    render() {
        let {user, orgs} = this.props;
        if (!store.get('token')) {
            return <Login/>;
        }
        return (
            <div>
                <Header logout={this.logout} user={this.props.user}/>
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
        orgs: state.organizations
    };
}

function mapActionsToDispatch(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        orgActions: bindActionCreators(orgsActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapActionsToDispatch)(App);
