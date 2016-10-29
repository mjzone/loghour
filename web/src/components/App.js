import React, { PropTypes } from 'react';
import Login from './login/LoginPage';
import Header from './common/Header';
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
            if(localStorage.getItem('token')){
                this.initialize();
            }

            if(this.props.location.query.code){
               api.getToken(this.props.location.query.code).then(
                (result) => {
                    debugger;
                    localStorage.setItem('token', JSON.stringify(result.data.token));
                    localStorage.setItem('user', JSON.stringify(result.data.user));
                    localStorage.setItem('orgs', JSON.stringify(result.data.orgs));
                    this.initialize();
                }, (err) => {
                    throw ('Error: '+ err);
                }
            );
        }
    }

    initialize(){
        this.props.userActions.setUserInfoState(JSON.parse(localStorage.getItem('user')));
        this.props.orgActions.setOrgsState(JSON.parse(localStorage.getItem('orgs')));
        this.context.router.push('/organizations');
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('orgs');
        this.context.router.push('/');
    }

    render() {
        let {user, orgs} = this.props;
        if (!localStorage.getItem('token')) {
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
