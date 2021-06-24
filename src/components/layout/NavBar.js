import React from 'react';
import PropTypes from 'prop-types';

function NavBar(props) {
    const {title} = props
    return (
        <nav className='navbar bg-success'>
            <h1>
                {title}</h1>
        </nav>
    );
}

NavBar.defaultProps = {
    title: "webb fontane"
}
NavBar.prototype = {
    title: PropTypes.string.isRequired
}

export default NavBar;