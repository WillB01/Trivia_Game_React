import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import PossibleAnswers from '../../PossibleAnswers/PossibleAnswers';
import styles from './Cards.module.css';
import axios from 'axios';
import _ from 'lodash';

// const  fetchRandomCategoryForRandomHints = (categories) => {
//     const rand = _.random(0, categories.length)
//     const id = categories[rand].id;
//     axios.get(`http://jservice.io/api/category?id=${id}`)
//         .then(res => {
//             console.log(res);
//             return res.data.clues;
//         })
//         .catch(err => {
//             console.log(err);
//         })

// };


const cards = (props) => {
    const selectedCategory = props.selectedCategory;
    const index = props.index;
    const progressBar = props.progrssBar;
    const triviaMainStartGame = props.triviaMainStartGame;
    const hints = [...props.hints]
    // console.log(hints);
    // const hints  = fetchRandomCategoryForRandomHints(props.ctg);


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
                         allAnswers={selectedCategory.map(item => item.answer)}
                         hints={hints.map(item => item.answer)}
                         userAnswerClick={(userAnswer) => props.playerAnswerClickHandler(userAnswer, selectedCategory[index].answer)}
                         gameStart={triviaMainStartGame} />
    </div>
        );


};

export default cards;