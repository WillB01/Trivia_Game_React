import React from 'react'
import styles from './HealthBar.module.css';
import {FaHeart} from 'react-icons/fa';

const healthBar = (props) => {
    const healthBar =  [];
    const length = props.life;
    for (let i = 0; i < length; i++) {
       healthBar.push(i);
    }
    return(
        <div className={styles.HealthBar} >
                <div className={styles.Health}>
                    {healthBar.map(h => (<FaHeart key={h} className={`${styles.Heart} pulse`} />))}    
                </div>
        </div>
    );
};

export default healthBar;