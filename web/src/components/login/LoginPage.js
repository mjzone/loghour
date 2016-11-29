import React from 'react';
import { Link } from 'react-router';

class LoginPage extends React.Component{
    render() {
      let githubURL = "https://github.com/login/oauth/authorize?client_id=e0a7a30e5cae1970efaf&scope=repo%20read:org";
        return (
            <div className="login-container">
                <div className="login blankslate blankslate-spacious">
                    <h1> Loghour </h1>
                    <p> An easy time tracking tool for github to increase the productivity. </p>
                    <a href={githubURL} className="btn btn-primary btn-lg">Login With GitHub</a>
                </div>
            </div>
        );
    }
}

export default LoginPage;
