import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import PossibleAnswers from '../../PossibleAnswers/PossibleAnswers';
import styles from './Cards.module.css';




const cards = (props) => {
    const selectedCategory = props.selectedCategory;
    const index = props.index;
    const progressBar = props.progrssBar;
    const triviaMainStartGame = props.triviaMainStartGame;
    return(
        <div key={index} className={styles.QuestionCard}>
        <h2 className={styles.Header}>
                {selectedCategory[index].category.title}
        </h2>
        <ProgressBar progressBar={progressBar} />
        <p className={styles.Text}>
            {selectedCategory[index].question}
        </p>
        <PossibleAnswers correctAnswer={selectedCategory[index].answer} 
                         allAnswers={props.answers.map(a => a)}
                         userAnswerClick={(userAnswer) => props.playerAnswerClickHandler(userAnswer, selectedCategory[index].answer)}
                         gameStart={triviaMainStartGame}
                         />
    </div>
        );


};

export default cards;