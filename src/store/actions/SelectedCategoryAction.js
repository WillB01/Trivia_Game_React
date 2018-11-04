import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setSelectedCategory = (selectedCategory) => {
    return {
        type: actionTypes.FETCH_SELECTED_CATEGORY,
        selectedCategory
    };
};

export const setSelectedCategoryFail = () => {
    return {
        type: actionTypes.FETCH_SELECTED_CATEGORY_FAIL
    };
};

export const newQuestionCards = (cards) => {
    return {
        type: actionTypes.SET_NEW_QUESTION_CARDS,
        cards

    };
};

export const setProgressProgressBar = (progress) => {
    return {
        type: actionTypes.SELECTED_CATEGORY_SET_PROGRESS_PROGRESSBAR,
        progress
    };
};

export const selectedCategoryCompleted = (id, score) => {
    return {
        type: actionTypes.SELECTED_CATEGORY_COMPLETED,
        id,
        score
    };
};

export const resetSelectCategory = () => {
    return {
        type: actionTypes.RESET_SELECTED_CATEGORY
    };
};




export const fetchSelectedCategory = (id) => {
    const url = `http://jservice.io/api/clues/?category=${id}`;
    return dispatch => {
        axios.get(url)
        .then(res => {
            dispatch(setSelectedCategory(res.data));
        })
        .catch(err => (dispatch(setSelectedCategoryFail())));
    }

}; // Gets the selected category wich the user picked