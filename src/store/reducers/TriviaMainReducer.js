import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../shared/utility';
const initialState = {
   score: '',
   isCorrect: false,
   correctAnswer: '',
   playerAnswer: ''
};

const setPlayerAnswer = (state, action) => updateObject(state, {playerAnswer: action.playerAnswer, correctAnswer: action.correctAnswer});

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.GET_PLAYER_ANSWER) {
        return setPlayerAnswer(state, action);
    }
    return state;
};

export default reducer;