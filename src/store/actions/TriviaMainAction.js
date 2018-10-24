import * as actionTypes from './actionTypes';

export const getPlayerAnswer= (playerAnswer) => {
    return {
        type: actionTypes.GET_PLAYER_ANSWER,
        playerAnswer
    };
};