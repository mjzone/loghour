import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
    render(){
        return (
            <div>
                <div className="row large-6 large-offset-5 medium-6 medium-offset-5 small-6 small-offset-5 columns">
                    <h3>User Profile</h3>
                </div>              
            </div>            
        );
    }
}
