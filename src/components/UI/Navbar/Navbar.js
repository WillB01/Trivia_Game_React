import React from 'react'
import {NavLink} from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = (props) => {
    return(
        <nav className={styles.Navbar}>
           
        <div className={styles.NavbarItems}>
            <NavLink className={styles.NavItem} to="/">Home</NavLink>
            {!props.isAuthenticated 
            ? <NavLink className={styles.NavItem} to="/auth">Authenticate</NavLink>
            : <NavLink className={styles.NavItem} to="/logout">Logout</NavLink> }
        </div>
        </nav>
    );
};

export default Navbar;