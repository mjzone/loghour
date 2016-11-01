import React from 'react';
import { Link } from 'react-router';

class LoginPage extends React.Component{
    render() {
      let githubURL = "https://github.com/login/oauth/authorize?client_id="+ GLOBALS.github_id +"&scope=repo%20read:org";
        return (
            <div className="container-fluid">
                <div className="jumbotron">
                    <h1> Welcome to Loghour </h1>
                    <p> An easy time tracking tool for github to increase the productivity. </p>
                    <a href={githubURL} className="btn btn-primary btn-lg">Login With GitHub</a>
                </div>
            </div>
        );
    }
}

export default LoginPage;
