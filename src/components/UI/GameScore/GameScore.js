import React from 'react'
import styles from './GameScore.module.css';
import {FaHeart} from 'react-icons/fa';

const gameScore = (props) => {
    const healthBar =  [];
    const length = props.life;
    for (let i = 0; i < length; i++) {
       healthBar.push(i);
    }
    return(
        <div className={styles.GameScore} >
                <div className={styles.Health}>
                 {healthBar.map(h => (<FaHeart key={h} className={`${styles.Heart} pulse`} />))}    
                </div>
        </div>
    );
};

export default gameScore;