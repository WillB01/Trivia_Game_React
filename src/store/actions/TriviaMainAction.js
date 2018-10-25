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