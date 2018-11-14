import React from 'react';
import styles from './Ribbon.module.css';
import {NavLink} from 'react-router-dom';

const ribbon = () => {
    return(
        <div className={styles.InformationCardContainer}>
             <NavLink to="/">QUIZ GAME</NavLink> 
        </div>
    )
};

export default ribbon;