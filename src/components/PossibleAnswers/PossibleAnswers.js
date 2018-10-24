import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

// const shuffleAnswers = (correctAnswer) => _.shuffle(['korv', 'kewl', 'nej', 'Stockholm', 'Writing', 'Nice', correctAnswer]);

const possibleAnswers = (props) => {
    // const shuffledAnswers = shuffleAnswers(props.correctAnswer);
    const otherShuffledAnswers = _.shuffle(props.allAnswers);
        return (
            <div>
                {otherShuffledAnswers.map((item, index) => <button onClick={() => props.userAnswerClick(item)} key={index}>{item}</button>)}
            </div>
        );
    };


export default possibleAnswers;