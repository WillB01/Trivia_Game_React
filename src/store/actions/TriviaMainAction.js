import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as k from '../../k';
export const getPlayerAnswer= (playerAnswer, correctAnswer) => {
    return {
        type: actionTypes.GET_PLAYER_ANSWER,
        playerAnswer,
        correctAnswer
    };
};

export const startGame = () => {
    return {
        type: actionTypes.STATE_GAME
    }
};

export const resetGame = () => {
    return {
        type: actionTypes.RESET_GAME
    };
};

export const newQuestionCard = () => {
    return {
        type: actionTypes.NEW_QUESTION_CARD
    };
};

// scoreToCompleteSelectedCategory
// selectedCategoryCompletedId
// score
// scoreToCompleteSelectedCategory
// amountOfCards
// id
// scoreToCompleteSelectedCategory

export const completedCategory = (scoreToCompleteSelectedCategory, selectedCategoryCompletedId, amountOfCards, id) => {
    console.log(scoreToCompleteSelectedCategory);
    console.log(selectedCategoryCompletedId);
    console.log(amountOfCards);
    console.log(id);
    return {
        type: actionTypes.COMPLETED_CATEGORY,
        scoreToCompleteSelectedCategory,
        selectedCategoryCompletedId,
        amountOfCards,
        id
    };
};





