import React from 'react';
import {FaCheck} from 'react-icons/fa';
import styles from './CompletedCategory.module.css';
import {NavLink} from 'react-router-dom';

const completedCategory = (props) => {
    return(
        
        <div className={`${styles.CompletedCategory} animated slideInLeft `}>
          <FaCheck />
           <div>Congrats! You completed {props.title}</div>
           <div className={`${styles.Links} animated slideInLeft `} >
            <NavLink to="/">Back Home</NavLink>
           </div>
        </div>
        
       
    );
    
};

export default completedCategory;