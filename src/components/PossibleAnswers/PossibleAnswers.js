import React from 'react';
import _ from 'lodash';
import Button from '../UI/Button/Button';

const possibleAnswers = (props) => {
    const dynamicAns = props.allAnswers;
    const otherShuffledAnswers = _.shuffle(dynamicAns);

    return (
        <div>
            {otherShuffledAnswers.map((item, index) => 
                <Button btnType={'Card'}
                        disabled={!props.gameStart} 
                        click={() => props.userAnswerClick(item)}
                        key={index}>{item}</Button>)}        
         </div>
    );
}; // random hints and always correct answer
                            
export default possibleAnswers;