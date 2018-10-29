import React from 'react'
import { getPlayerAnswer } from '../../../store/actions';

const wrongAnswer = (props) => {
    const isCorrect = props.playerAnswer === props.correctAnswer ? true : false;
    let background = 'white'
    if (props.start) {
        background = isCorrect ? 'white' : 'white' || props.playerAnswer !== '' || !isCorrect ? 'red': 'white';
    }
    const progressBar = {
    background,
    height: '10px',
    width: `100px%`,
    };
   

return(<div style={progressBar}></div>);
};

export default wrongAnswer;