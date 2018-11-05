import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setSelectedCategory = (selectedCategory) => ({type: actionTypes.FETCH_SELECTED_CATEGORY, selectedCategory});
export const setSelectedCategoryFail = () => ({type: actionTypes.FETCH_SELECTED_CATEGORY_FAIL});
export const newQuestionCards = (cards) => ({type: actionTypes.SET_NEW_QUESTION_CARDS, cards});
export const setProgressProgressBar = (progress) => ({ type: actionTypes.SELECTED_CATEGORY_SET_PROGRESS_PROGRESSBAR, progress});
export const resetSelectCategory = () => ({type: actionTypes.RESET_SELECTED_CATEGORY});

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