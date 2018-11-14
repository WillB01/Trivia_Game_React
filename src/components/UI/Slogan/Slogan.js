import React from 'react'
import styles from './Slogan.module.css';
import AuthHeader from '../AuthHeader/AuthHeader';

const slogan = () => (
    <div className={`${styles.Slogan} bounceInLeft`}>
        < AuthHeader />
           <h5>Hundreds of categories & thousands of questions for you to conquer!</h5>
    </div>
);

export default slogan;