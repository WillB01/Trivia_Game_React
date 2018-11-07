import React from 'react';
import styles from './IncompleteCategory.module.css';
import {NavLink} from 'react-router-dom';

const incompleteCategory = (props) => {
    return(
        <div className={`${styles.IncompleteCategory} animated slideInLeft `}>
          {/* <FaCheck /> */}
           <div>Better try next time!{props.title}</div>
           <div className={`${styles.Links} animated slideInLeft `} >
            <NavLink to="/">Back Home</NavLink>
           </div>
          
        </div>
       
    );
};

export default incompleteCategory;