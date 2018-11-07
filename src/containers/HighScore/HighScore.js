import React, { Component } from 'react'
import styles from './HighScore.module.css';
import * as k from '../../k';

class HighScore extends Component {
    componentDidMount() {
       const url =  k.urlGetHighScore(localStorage.getItem('token'));
    }
   render() {
    return(
        <div className={styles.HighScoreContainer}>
            highscore
        </div>
    )
   };
};

export default HighScore;