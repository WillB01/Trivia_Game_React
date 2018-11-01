import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as kau from '../../k';
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

export const completedCategory = () => {
    return {
        type: actionTypes.COMPLETED_CATEGORY
    };
};

export const postPlayerSuccess = () => {
    return {
        type: actionTypes.POST_PLAYER_SUCCESS
    };
};

export const postPlayerFail = (error) => {
    return {
        type: actionTypes.POST_PLAYER_FAIL
    };
};


export const postPlayerInfo = () => {
    const test = {
        'test': 'kewl'
    }
    return dispatch => {
        axios.post(kau.url,test)
            .then(res => {
                console.log(res.data);
                dispatch(postPlayerSuccess())
            })
            .catch(err => {
                dispatch(postPlayerFail(err));
            });
    };
};


