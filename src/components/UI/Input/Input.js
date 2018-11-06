import React from 'react';
import styles from './Input.module.css';

const input = (props) => {
    // let inputElement = null;
    // const inputClasses = [styles.input];

    // if(props.invalid && props.shouldValidate && props.touched) {
    //     inputClasses.push(styles.Invalid);
    // }
    // switch(props.isSignup) {
    //     case true:
    //         inputElement =  <label className={styles.Label}>{props.label}</label>
    //         <input className={styles.Input} type={props.type} 
    //                placeholder={props.placeholder} 
    //                value={props.value || ''} 
    //                onChange={props.changed} /> ;
    //     break;
    //     default:
    //         inputElement =   <label className={styles.Label}>{props.label}</label>
    //         <input className={styles.Input} type={props.type} 
    //                placeholder={props.placeholder} 
    //                value={props.value || ''} 
    //                onChange={props.changed} /> ;
    // }
   
    return (
        <React.Fragment>
            <label className={styles.Label}>{props.id}</label>
            <input className={styles.Input} type={props.type} 
                   placeholder={props.placeholder} 
                   value={props.value || ''} 
                   onChange={props.changed} /> 
        </React.Fragment>
       
    );
};

export default input