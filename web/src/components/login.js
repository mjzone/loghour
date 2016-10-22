import _ from 'lodash';
import React from 'react';

export default class Login extends React.Component {
    render(){
        return (
            <div>
                <div className="row large-6 large-offset-5 medium-6 medium-offset-5 small-6 small-offset-5 columns">
                    <h2 className="page-title">Login Page</h2>
                        <div class="callout">
                            <p> Login with GitHub account below </p>
                            <a href="https://github.com/login/oauth/authorize?client_id=f7388ab1b45fef7a01cf" className="button">Login With GitHub</a>
                        </div>
                    </div>     
                </div>            
        );
    }
}
