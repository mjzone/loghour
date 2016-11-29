import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = ({logout, user}) => {
    return (
        <nav className="header-nav">
            <div className="container">
                <div className="columns">
                    <div className="one-fifth column">
                        <p>Hello</p>
                    </div>
                    <div>
                        <a className="pointer right" onClick={logout}>Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

Header.propTypes = {
    logout: React.PropTypes.func,
    user: PropTypes.object
};

export default Header;
