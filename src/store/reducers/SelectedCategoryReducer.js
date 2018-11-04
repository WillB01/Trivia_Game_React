import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../shared/utility';

const initialState = {
    selectedCategory: null,
    amountOfCards: [],
    amountOfCardsPlayed: '',
    progressBar: null,
    scoreToCompleteSelectedCategory: 0,
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
        scoreToCompleteSelectedCategory: arr.length
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
        amountOfCardsPlayed: state.amountOfCardsPlayed += 1
    });
};

const setUpdateProgressBar = (state, action) => {
    const progress = state.progressBar;
    return updateObject(state, {
        progressBar: progress + action.progress
    });
};

// const selectedCategoryCompleted = (state, action) => {
//     const score =  (state.scoreToCompleteSelectedCategory / 2) + 1;
//     let ids = state.selectedCategoryCompletedId;
//     if (action.score >= score
//         && state.scoreToCompleteSelectedCategory 
//         && state.amountOfCards.length === 0) {
//             ids.push(action.id)
//             console.log(state.scoreToCompleteSelectedCategory)
//             let noDuplicates = _.uniq(ids)
//             return updateObject(state, {
//                 selectedCategoryCompleted: true,
//                 selectedCategoryCompletedId: noDuplicates,
                
//             }); // checks if the player has completed the category or not.
//     } 
//     return updateObject(state, {
//         selectedCategoryCompleted: false,        
//     });
// };

const setResetSelectedCategory = (state, action) => {
    return updateObject(state, {
        selectedCategory: null,
        amountOfCards: [],
        progressBar: null,
        selectedCategoryCompleted: false,
        amountOfCardsPlayed: '',
        scoreToCompleteSelectedCategory: null
    });
}; // Resets everything in selected

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
    if (action.type === actionTypes.SELECTED_CATEGORY_SET_PROGRESS_PROGRESSBAR) {
        return setUpdateProgressBar(state, action);
    }
    // if (action.type === actionTypes.SELECTED_CATEGORY_COMPLETED) {
    //     return selectedCategoryCompleted(state, action);
    // }
    if (action.type === actionTypes.RESET_SELECTED_CATEGORY) {
        return setResetSelectedCategory(state, action);
    }
    return state;
};

export default reducer;