import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = ({logout, user}) => {
    return (
        <nav>
            <div className="row well">
                <div className="col-md-10 right-align">
                    <p>{user.name}</p>
                </div>
                <div className="col-md-1 right-align">
                     <a className="pointer" onClick={logout}>Logout</a>
                </div>
            </div>
        </nav>
    );
};

Header.propTypes = {
    logout: React.PropTypes.func,
    user: PropTypes.object,
};

export default Header;
