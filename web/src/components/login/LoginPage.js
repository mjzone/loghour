import React from 'react';
import { Link } from 'react-router';

class LoginPage extends React.Component{
    render() {
        return (
            <div className="container-fluid">
                <div className="jumbotron">
                    <h1> Welcome to Loghour </h1>
                    <p> An easy time tracking tool for github to increase the productivity. </p>
                    <a href="https://github.com/login/oauth/authorize?client_id=f7388ab1b45fef7a01cf&scope=repo" className="btn btn-primary btn-lg">Login With GitHub</a>
                </div>
            </div>            
        );
    }
}

export default LoginPage;

