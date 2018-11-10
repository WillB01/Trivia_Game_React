import React from 'react';
import _ from 'lodash';
import Button from '../UI/Button/Button';

 const shuffleAnswers = (allanswers) => _.shuffle([
 ...allanswers]);

const possibleAnswers = (props) => {
    // const shuffledAnswers = shuffleAnswers(props.correctAnswer);
    // const rand = _.random(0, props.hints.categories.length);
    // console.log(props.hints.categories);

    // console.log(rand)
    // console.log(_.shuffle(props.hints.categories[rand]).id)
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