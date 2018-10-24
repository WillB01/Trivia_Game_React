import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../shared/utility';


const initialState = {
    categories: null,
    selectedCategory: null,
    error: false
};


const setCategories = (state, action)  => {
    return updateObject(state, {
        categories: action.categories
    });
};

const fetchCategoriesFail = (state, action) => {
    return updateObject(state, {
        error: true
    });
};

const setSelectedCategory = (state, action)  => {
    return updateObject(state, {
        selectedCategory: action.selectedCategory,
    });
};

const fetchSelectedCategoryFail = (state, action) => {
    return updateObject(state, {
        error: true
    });
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.FETCH_CATEGORIES) {
        return setCategories(state, action);
    }
    if (action.type === actionTypes.FETCH_CATEGORIES_FAIL) {
        return fetchCategoriesFail(state, action);
    }
    if (action.type === actionTypes.FETCH_SELECTED_CATEGORY) {
        return setSelectedCategory(state, action);
    }
    if (action.type === actionTypes.FETCH_SELECTED_CATEGORY_FAIL) {
        return fetchSelectedCategoryFail(state, action);
    }
 
    return state;
};

export default reducer;