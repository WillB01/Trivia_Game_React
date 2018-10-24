import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../shared/utility';
const initialState = {
    categories: null,
};


const setCategories = (state, action)  => {
    return updateObject(state, {
        categories: action.categories
    });
};


const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.SET_CATEGORIES) {
        return setCategories(state, action);
    }
    return state;
};

export default reducer;