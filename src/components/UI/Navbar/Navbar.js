import React from 'react'
import {NavLink, link} from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = (props) => {
    return(
        <nav className={styles.Navbar}>
            <NavLink className={styles.NavItem} to="/">Home</NavLink>

            {!props.isAuthenticated 
            ? <NavLink className={styles.NavItem} to="/auth">Authenticate</NavLink>
            : <NavLink className={styles.NavItem} to="/logout">Logout</NavLink> }
        </nav>
    );
};

export default Navbar;