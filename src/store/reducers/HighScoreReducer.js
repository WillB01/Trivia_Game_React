import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../shared/utility';

const initialState = {
    highscore: null,
    error: null
};

const setHighScore = (state, action) => {
    return updateObject(state , {
        highscore : action.highscore
    });
}

const setHighScoreFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_HIGHSCORES_SUCCESS: return setHighScore(state, action);
        case actionTypes.FETCH_HIGHSCORES_FAIL: return setHighScoreFail(state, action);
        default: return state;
    }
};

export default reducer;