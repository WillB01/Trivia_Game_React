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
    let fiveMinutes = 30 * 1;
    setStartTimer(fiveMinutes);
    return updateObject(state, {startGame: true})
};

const setStartTimer = (duration, display) => {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        console.log(seconds);
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);

    
}

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
};

const SetNewQuestionCard = (state, action) => {
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
    if (action.tyoe === actionTypes.NEW_QUESTION_CARD) {
            return SetNewQuestionCard(state, action);
    }
    return state;
};

export default reducer;