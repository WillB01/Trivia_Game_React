import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../shared/utility';

const initialState = {
    selectedCategory: null,
    amountOfCards: [],
    amountOfCardsPlayed: '',
    progressBar: null,
    scoreToCompleteSelectedCategory: 0,
    selectedCategoryCompleted: false,
    selectedCategoryCompletedId: [],
    answers : [],
};


const setSelectedCategory = (state, action)  => {
    let arr = [];
    const answers = action.selectedCategory.map(i => i.answer);
    action.selectedCategory.map((item, index) => (arr.push(index)));
    return updateObject(state, {
        selectedCategory: action.selectedCategory,
        amountOfCards: arr,
        progressBar: null,
        selectedCategoryCompleted: false,
        scoreToCompleteSelectedCategory: arr.length,
        answers: answers
    });
};

const fetchSelectedCategoryFail = (state, action) => {
    return updateObject(state, {
        error: true
    });
};

const setNewQuestionCards = (state, action) => {
    const newAnswers = action.isCorrect ? state.answers.filter(i => i !== action.userAns && action.isCorrect) : state.answers;
    const newCards = [...state.amountOfCards];
    newCards.shift();
    return updateObject(state, {
        amountOfCards: newCards,
        amountOfCardsPlayed: state.amountOfCardsPlayed += 1,
        answers: newAnswers
    });
};

const setUpdateProgressBar = (state, action) => {
    const progress = state.progressBar;
    return updateObject(state, {
        progressBar: progress + action.progress
    });
};


const setResetSelectedCategory = (state, action) => {
    return updateObject(state, {
        selectedCategory: null,
        amountOfCards: [],
        progressBar: null,
        selectedCategoryCompleted: false,
        amountOfCardsPlayed: '',
        scoreToCompleteSelectedCategory: null,
        answers: []
    });
}; // Resets everything in selected

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_SELECTED_CATEGORY : return setSelectedCategory(state, action)
        case actionTypes.FETCH_SELECTED_CATEGORY_FAIL : return fetchSelectedCategoryFail(state, action);
        case actionTypes.SET_NEW_QUESTION_CARDS : return setNewQuestionCards(state, action);
        case actionTypes.SELECTED_CATEGORY_SET_PROGRESS_PROGRESSBAR : return setUpdateProgressBar(state, action);
        case actionTypes.RESET_SELECTED_CATEGORY :  return setResetSelectedCategory(state, action);
        default : return state;
    }
};

export default reducer;