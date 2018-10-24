import React from 'react'
import {NavLink} from 'react-router-dom';

const Navbar = (props) => {
    return(
        <nav>
            <NavLink to="/">Home</NavLink>
        </nav>
    );
};

export default Navbar;