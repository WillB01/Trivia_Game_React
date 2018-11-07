import React from 'react'
import {NavLink} from 'react-router-dom';
import styles from './Navbar.module.css';
import InformationCard from '../InformationCard/InformationCard';
import PlayerInfo from '../PlayerInfo/PlayerInfo';


const Navbar = (props) => {
    return(
        <nav className={styles.Navbar}>
            <div className={styles.Logo}>
                <InformationCard />
            </div>
           
        <div className={styles.NavbarItems}>
            <NavLink className={styles.NavItem} to="/">Home</NavLink>
            {!props.isAuthenticated 
            ? <NavLink className={styles.NavItem} to="/auth">Authenticate</NavLink>
            : <NavLink className={styles.NavItem} to="/logout">Logout</NavLink> }
        </div>
            <PlayerInfo />
        </nav>
    );
};

export default Navbar;