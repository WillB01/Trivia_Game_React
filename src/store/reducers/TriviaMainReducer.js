import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../shared/utility';
import { startGame, addTotalScore } from '../actions';
const initialState = {
   isCorrect: false,
   correctAnswer: '',
   playerAnswer: '',
   startGame: false,
   player: {
    name: 'Willy',
    score: {
        total: 0,
        selectedCategory: 0
    },


   }
};

const compare = (a, b) => {
    return (a === b ? true: false);
}; // compares something


const setPlayerAnswer = (state, action) => { //BAD NAME CHANGE
    const playerAnswer = action.playerAnswer;
    const correctAnswer = action.correctAnswer;
    
    if (!compare(playerAnswer, correctAnswer)) {
        return updateObject(state, {
            isCorrect: false,
            correctAnswer: correctAnswer,
            playerAnswer: playerAnswer,
        });
    };


    return updateObject(state, { 
        isCorrect: true,
        correctAnswer: correctAnswer,
        playerAnswer: playerAnswer,
        player: {
            ...state.player,
            score: {
                ...state.player.score,
                selectedCategory: state.player.score.selectedCategory += 1

            }
        }    
    });
}; // checks everything that has to do with the game adds SCORE!!!!!!!!

const setStartGame = (state, action) => {
    return updateObject(state, {startGame: true})
}; // Starts a game

const setResetGame = (state, action) => {
    const oldState = {
        isCorrect: false,
        correctAnswer: '',
        playerAnswer: '',
        startGame: false,
    };
    return updateObject(state, oldState);
}; //resets state

const setNewQuestionCard = (state, action) => {
    return updateObject(state, {
        isCorrect: false,
        correctAnswer: '',
        playerAnswer: '',
        startGame: true

    });
};

const setAddTotalScore = (state, action) => {
    return {
        player: {
            ...state.player,
            score: {
                ...state.player.score,
                total: state.player.score.total += 1

            }
        }    
    }
};      

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.GET_PLAYER_ANSWER) {
        return setPlayerAnswer(state, action);
    }
    if (action.type === actionTypes.STATE_GAME) {
        return setStartGame(state, action);
    }
    if (action.type === actionTypes.RESET_GAME) {
        return setResetGame(state, action);
    }
    if (action.type === actionTypes.NEW_QUESTION_CARD) {
            return setNewQuestionCard(state, action);
    }
    if (action.type === actionTypes.ADD_TOTAL_SCORE) {
        return setAddTotalScore(state, action);
    }
  
    return state;
};

export default reducer;