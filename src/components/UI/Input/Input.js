import React from 'react';
import styles from './Input.module.css';

const input = (props) => {
    return (
        <React.Fragment>
            <label className={styles.Label}>{props.label}</label>
            <input className={styles.Input} type={props.type} 
                   placeholder={props.placeholder} 
                   value={props.value || ''} 
                   onChange={props.changed} />
        </React.Fragment>
       
    );
};

export default input