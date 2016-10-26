import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component{
    render() {
        return (
            <div className="jumbotron">
                <h1> Welcome to Loghour </h1>
                <p> This is a time tracking tool for github to increase the effiency. </p>
                <a href="https://github.com/login/oauth/authorize?client_id=f7388ab1b45fef7a01cf&scope=repo" className="btn btn-primary btn-lg">Login With GitHub</a>
            </div>
        );
    }
}

export default HomePage;

