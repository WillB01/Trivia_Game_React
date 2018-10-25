import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../shared/utility';


const initialState = {
    categories: null,
    selectedCategory: null,
    error: false,
    amountOfCards: []
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
    let arr = [];
    action.selectedCategory.map((item, index) => (arr.push(index)));
    return updateObject(state, {
        selectedCategory: action.selectedCategory,
        amountOfCards: arr
    });
};

const setNewQuestionCards = (state, action) => {
    const newCards = [...state.amountOfCards];
    newCards.shift();
    return updateObject(state, {
        amountOfCards: newCards
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
    if (action.type === actionTypes.SET_NEW_QUESTION_CARDS) {
        return setNewQuestionCards(state, action);
    }
 
    return state;
};

export default reducer;