import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../shared/utility';


const initialState = {
    categories: null,
    error: false,
};

const setCategories = (state, action)  => ( updateObject(state, {categories: action.categories}));
const fetchCategoriesFail = (state, action) => (updateObject(state, {error: true}));

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CATEGORIES : return setCategories(state, action);
        case actionTypes.FETCH_CATEGORIES_FAIL : return fetchCategoriesFail(state, action);
        default : return state;
    }
};

export default reducer;