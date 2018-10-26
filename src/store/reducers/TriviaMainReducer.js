import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../shared/utility';
import { startGame } from '../actions';
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

const updateObjectInArray = (array, action) => {
    return array.map((item, index) => {
      if (index !== action.index) {
        return item
      }
      return {
        ...item,
        ...action.item
      }
    });
  };



const setPlayerAnswer = (state, action) => { //BAD NAME CHANGE
    const playerAnswer = action.playerAnswer;
    const correctAnswer = action.correctAnswer;
    
   
    console.log(state.player);

    // let b = updateObjectInArray(...)

    // let test = updateObjectInArray(oldPlayer, )

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
                selectedCategory: state.player.score.selectedCategory += 5

            }
        }    
    });
}; // checks everything that has to do with the game

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