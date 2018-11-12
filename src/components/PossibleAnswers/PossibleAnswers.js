import React from 'react';
import _ from 'lodash';
import Button from '../UI/Button/Button';
import styles from './PossibleAnswers.module.css';

 const shuffleAnswers = (allanswers) => _.shuffle([
 ...allanswers]);

const possibleAnswers = (props) => {
    const staticAns = props.staticAnswers;
    const dynamicAns = props.allAnswers;
    // const removeLast = dynamicAns.splice(0, dynamicAns.length - 2);
    const getLast = staticAns.splice(staticAns.length - 2, staticAns.length)
    console.log(getLast);
    // const updatedStaticAns = [props.staticAns.length - 1];
    
    const otherShuffledAnswers = _.shuffle(shuffleAnswers(dynamicAns));

        return (
            <div>
                {otherShuffledAnswers.map((item, index) => 
                  <Button btnType={'Card'}
                          disabled={!props.gameStart} 
                          click={() => props.userAnswerClick(item)}
                          key={index}>{item}</Button>)}
              
                    {/* <input className={styles.Input} placeholder="your answer" /> */}
        
            </div>
        );
    };
                            

export default possibleAnswers;