import React from 'react';
import styles from './IncompleteCategory.module.css';

const incompleteCategory = (props) => {
    return(
        <div className={`${styles.IncompleteCategory} animated slideInLeft `}>
          {/* <FaCheck /> */}
           <div>Better try next time!{props.title}</div>
        </div>
       
    );
};

export default incompleteCategory;