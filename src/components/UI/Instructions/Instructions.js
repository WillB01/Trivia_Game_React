import React from 'react'
import styles from './Instructions.module.css';
import AuthHeader from '../AuthHeader/AuthHeader';

const instructions = () => (
    <div className={`${styles.Instructions} bounceInLeft`}>
        < AuthHeader />
           <h5>Hundreds of categories & thousands of questions for you to conquer!</h5>
    </div>
);

export default instructions;