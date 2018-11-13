import React from 'react'
import styles from './SlideInMenu.module.css'
import {NavLink} from 'react-router-dom';
import {FaUser} from 'react-icons/fa';

const slideInMenu = (props) => {
    return(
        <div className={`${styles.SlideInMenu} slideInLeft`} onClick={props.click}>
            <div className={styles.Items} >
               <h3>Quiz Game</h3>
            </div>
         
            <div className={styles.Items} >
                <NavLink to="/">Home</NavLink>  
            </div>
            <div className={styles.Items}>
                <NavLink  to="/logout">exit game</NavLink> 
            </div>
           
        </div>
    ) 
};

export default slideInMenu;