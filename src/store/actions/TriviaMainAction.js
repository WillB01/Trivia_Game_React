import * as actionTypes from './actionTypes';
import * as k from '../../k';
import axios from 'axios';


export const getPlayerAnswer= (playerAnswer, correctAnswer) => {
    return {
        type: actionTypes.TRIVIA_MAIN_GET_PLAYER_ANSWER,
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

export const completedCategory = (scoreToCompleteSelectedCategory, selectedCategoryCompletedId, amountOfCards, id) => {
    return {
        type: actionTypes.TRIVIA_MAIN_COMPLETED_CATEGORY,
        scoreToCompleteSelectedCategory,
        selectedCategoryCompletedId,
        amountOfCards,
        id
    };
};


export const initPatchDbSuccess = () => {
    return {
        type: actionTypes.TRIVIA_MAIN_INIT_PATCH_DB_SUCCESS
    };
};

export const initPatchDbFail = () => {
    return {
        type: actionTypes.TRIVIA_MAIN_INIT_PATCH_DB_FAIL
    };
};

export const initPatchdDb = (triviaMain) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
    const url = k.url(token);
    const data = {
        [userId]: {
            name: triviaMain.player.name ? 'unknown' : triviaMain.player.name,
            hasRank: triviaMain.player.hasRank,
            rank: triviaMain.player.rank,
            id: userId,
            score: {
                total: triviaMain.player.score.total,
                completedQuestionsBonus: triviaMain.player.score.completedQuestionsBonus,
                selectedCategoryCompletedId: triviaMain.player.score.selectedCategoryCompletedId.length === 0 ? ['none'] :  triviaMain.player.score.selectedCategoryCompletedId
            }
    }
   

};

return dispatch => {
    axios.patch(url,data)
        .then(res => {
            console.log(res.data);
            dispatch(initPatchDbSuccess())

        })
        .catch(err => {
            dispatch(initPatchDbFail(err));
        });
};

};









