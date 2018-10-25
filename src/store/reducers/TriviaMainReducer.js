import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../shared/utility';
import { startGame } from '../actions';
const initialState = {
   score: '',
   isCorrect: false,
   correctAnswer: '',
   playerAnswer: '',
   playerCount: 0,
   startGame: false,
   amountOfCards: []
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
            playerAnswer: playerAnswer
        });
    };
    
    return updateObject(state, {
        isCorrect: true,
        correctAnswer: correctAnswer,
        playerAnswer: playerAnswer
    });
}; // checks everything that has to do with the game

const setStartGame = (state, action) => {
    return updateObject(state, {startGame: true})
}; // Starts a game

const setResetGame = (state, action) => {
    const oldState = {
        score: '',
        isCorrect: false,
        correctAnswer: '',
        playerAnswer: '',
        playerCount: 0,
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
  
    return state;
};

export default reducer;