import * as actionTypes from './actionTypes';

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