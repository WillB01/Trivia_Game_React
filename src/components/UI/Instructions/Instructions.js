import React from 'react'
import {FaInfoCircle} from 'react-icons/fa';
import styles from './Instructions.module.css';

const instructions = () => (
    <div className={`${styles.Instructions} bounceInLeft`}>
        <div className={styles.Icon}>
            < FaInfoCircle />
        </div>
        <div className={`${styles.Items} bounceInUp`}>
            <h1 className={'bounceInUp'}>1: Pick a category!</h1>
            <h1>2: Press start!</h1>
            <h1>3: Play!</h1>
        </div>
    </div>
);

export default instructions;