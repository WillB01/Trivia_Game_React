import React from 'react'
import styles from './WrongAnswer.module.css';

const wrongAnswer = (props) => {
    const isCorrect = props.playerAnswer === props.correctAnswer ? true : false;
    let background = 'none'
    if (props.start) {
        background = isCorrect ? 'none' : 'none' || props.playerAnswer !== '' || !isCorrect ? 'red': 'none';
    }
    const progressBar = {
    background
    };

    return(<div className={`${styles.WrongAnswer}`} style={progressBar}></div>);
};

export default wrongAnswer;