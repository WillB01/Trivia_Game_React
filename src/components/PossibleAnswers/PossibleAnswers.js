import React from 'react';
import _ from 'lodash';
import Button from '../UI/Button/Button';

// const shuffleAnswers = (correctAnswer) => _.shuffle(['korv', 'kewl', 'nej', 'Stockholm', 'Writing', 'Nice', correctAnswer]);

const possibleAnswers = (props) => {
    // const shuffledAnswers = shuffleAnswers(props.correctAnswer);
    const otherShuffledAnswers = _.shuffle(props.allAnswers);
        return (
            <div>
                {otherShuffledAnswers.map((item, index) => 
                  <Button btnType={'Card'}
                          disabled={!props.gameStart} 
                          click={() => props.userAnswerClick(item)}
                          key={index}>{item}</Button>)}
                
            </div>
        );
    };


export default possibleAnswers;