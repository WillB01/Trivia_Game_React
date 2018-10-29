import React from 'react';
import {FaCheck} from 'react-icons/fa';
import styles from './CompletedCategory.module.css';

const completedCategory = (props) => {
    return(
        
        <div className={`${styles.CompletedCategory} animated slideInLeft `}>
          <FaCheck />
           <div>{props.title}</div>
        </div>
       
    );
    
};

export default completedCategory;