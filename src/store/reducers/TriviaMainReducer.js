import * as actionTypes from '../actions/actionTypes';

const initialState = {
    categories: null,
};

const setCategories = (state, action)  => {
    initialState = {
        ...state,
        categories: action

        
    };
};


const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.SET_CATEGORIES) {
        return setCategories(state, action);
    }
    return state;
};

export default reducer;