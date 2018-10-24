import * as actionTypes from './actionTypes';

export const getPlayerAnswer= (playerAnswer, correctAnswer) => {
    return {
        type: actionTypes.GET_PLAYER_ANSWER,
        playerAnswer,
        correctAnswer
    };
};