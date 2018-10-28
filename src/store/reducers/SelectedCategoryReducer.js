import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../shared/utility';

const initialState = {
    selectedCategory: null,
    amountOfCards: [],
    progressBar: null,
    selectedCategoryCompleted: false,
    selectedCategoryCompletedId: []
};


const setSelectedCategory = (state, action)  => {
    let arr = [];
    action.selectedCategory.map((item, index) => (arr.push(index)));
    return updateObject(state, {
        selectedCategory: action.selectedCategory,
        amountOfCards: arr,
        progressBar: null,
        selectedCategoryCompleted: false,
    });
};

const fetchSelectedCategoryFail = (state, action) => {
   
    return updateObject(state, {
        error: true
    });
};


const setNewQuestionCards = (state, action) => {
    const newCards = [...state.amountOfCards];
    newCards.shift();
    return updateObject(state, {
        amountOfCards: newCards,
    });
};

const setUpdateProgressBar = (state, action) => {
    const progress = state.progressBar;
    return updateObject(state, {
        progressBar: progress + action.progress
    });
};

const selectedCategoryCompleted = (state, action) => {
    let ids = state.selectedCategoryCompletedId;
    ids.push(action.id)
    return updateObject(state, {
        selectedCategoryCompleted: true,
        selectedCategoryCompletedId: ids,
    });
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.FETCH_SELECTED_CATEGORY) {
        return setSelectedCategory(state, action);
    }
    if (action.type === actionTypes.FETCH_SELECTED_CATEGORY_FAIL) {
        return fetchSelectedCategoryFail(state, action);
    }
    if (action.type === actionTypes.SET_NEW_QUESTION_CARDS) {
        return setNewQuestionCards(state, action);
    }
    if (action.type === actionTypes.SET_PROGRESS_PROGRESSBAR) {
        return setUpdateProgressBar(state, action);
    }
    if (action.type === actionTypes.SELECTED_CATEGORY_COMPLETED) {
        return selectedCategoryCompleted(state, action);
    }
    return state;
};

export default reducer;