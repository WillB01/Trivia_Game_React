import * as actionTypes from './actionTypes';
import * as k from '../../k';
import axios from 'axios';

export const startGame = () =>  ({type: actionTypes.STATE_GAME}); // user presses btn in selectedCategory.
export const resetGame = () =>  ({type: actionTypes.RESET_GAME});
export const newQuestionCard = () => ({type: actionTypes.NEW_QUESTION_CARD});
export const initPatchDbSuccess = () => ({type: actionTypes.TRIVIA_MAIN_INIT_PATCH_DB_SUCCESS});
export const initPatchDbFail = () =>  ({type: actionTypes.TRIVIA_MAIN_INIT_PATCH_DB_FAIL});
export const dontInitPatchDbSuccess = () => ({ type: actionTypes.TRIVIA_MAIN_DONT_INIT_PATCH_SUCCESS });
const categoryGameOver = () => ({type: actionTypes.CATEGORY_GAMEOVER_TRIVIA_MAIN});
const continueGame = () => ({type: actionTypes.CATEGORY_CONTINUE_TRIVIA_MAIN});
const categoryCompletedSuccess = (id) => ({
    type: actionTypes.CATEGORY_COMPLETED_SUCCESS_TRIVIA_MAIN, 
    id});
export const getPlayerAnswer= (playerAnswer, correctAnswer) => ({
    type: actionTypes.TRIVIA_MAIN_GET_PLAYER_ANSWER,
    playerAnswer,
    correctAnswer
});

export const checkIfCategoryCompleted =  (scoreToCompleteSelectedCategory, selectedCategoryCompletedId, cards, id, playerScore, completeCtg) => {
        const score =  (scoreToCompleteSelectedCategory / 2) + 1;
        if (playerScore >= score
            && scoreToCompleteSelectedCategory 
            && cards.length === 0 && !completeCtg) { 
              return dispatch => {
                    dispatch(categoryCompletedSuccess(id));
                };
        }
        if (playerScore <= score
            && scoreToCompleteSelectedCategory 
            && cards.length === 0) { 
              return dispatch => {
                    dispatch(categoryGameOver());
                };
        }
        return dispatch => {
            dispatch(continueGame());
        };
       
};

export const initPatchdDb = (triviaMain) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
    const url = k.url(token);
    const data = {
        [userId]: {
            name: triviaMain.player.name,
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
    if (!triviaMain.firstLoggin) {
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
    }
    return dispatch => {
        dispatch(dontInitPatchDbSuccess());
    };
};









