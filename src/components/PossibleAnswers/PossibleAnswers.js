import React from 'react';
import _ from 'lodash';
import Button from '../UI/Button/Button';

 

const possibleAnswers = (props) => {
    let hints = [props.correctAnswer, ...props.hints];
    console.log(hints);
    const otherShuffledAnswers = _.shuffle(hints);
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