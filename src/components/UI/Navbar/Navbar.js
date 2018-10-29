import React from 'react'
import {NavLink} from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = (props) => {
    return(
        <nav className={styles.Navbar}>
            <NavLink to="/">Home</NavLink>
        </nav>
    );
};

export default Navbar;