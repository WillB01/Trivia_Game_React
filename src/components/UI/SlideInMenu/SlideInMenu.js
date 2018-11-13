import React from 'react'
import styles from './SlideInMenu.module.css'
import {NavLink} from 'react-router-dom';
const slideInMenu = (props) => {
    return(
        <div className={styles.SlideInMenu} onClick={props.click}>
        <NavLink className={styles.Items} to="/">Home</NavLink>
         {!props.isAuthenticated 
            ? <NavLink className={styles.Items} to="/auth">Authenticate</NavLink>
            : <NavLink className={styles.Items} to="/logout">Logout</NavLink> }
           
            
        </div>
    ) 
};

export default slideInMenu;