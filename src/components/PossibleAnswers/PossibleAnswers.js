import React from 'react';
import _ from 'lodash';
import Button from '../UI/Button/Button';

 const shuffleAnswers = (allanswers) => _.shuffle([
 ...allanswers]);

const possibleAnswers = (props) => {
    const otherShuffledAnswers = _.shuffle(shuffleAnswers(props.allAnswers));
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