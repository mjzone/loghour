import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = ({logout}) => {

    return (        
        <nav>
            <div className="row well">
                <div className="col-md-10 right-align">
                    <p>Manoj Fernando</p>
                </div>      
                <div className="col-md-1 right-align">
                     <a className="pointer" onClick={logout}>Logout</a>
                </div>       
            </div>        
        </nav>
    );
};

Header.propTypes = {
    logout: React.PropTypes.func
};

export default Header;
