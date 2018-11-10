import * as actionTypes from './actionTypes';
import _ from 'lodash';
import axios from 'axios';

export const setSelectedCategory = (selectedCategory) => ({type: actionTypes.FETCH_SELECTED_CATEGORY, selectedCategory});
export const setSelectedCategoryFail = () => ({type: actionTypes.FETCH_SELECTED_CATEGORY_FAIL});
export const newQuestionCards = (cards) => ({type: actionTypes.SET_NEW_QUESTION_CARDS, cards});
export const setProgressProgressBar = (progress) => ({ type: actionTypes.SELECTED_CATEGORY_SET_PROGRESS_PROGRESSBAR, progress});
export const resetSelectCategory = () => ({type: actionTypes.RESET_SELECTED_CATEGORY});
export const fetchRandomCategoryForRandomHintsSuccess = (hints) => ({type: actionTypes.FETCH_RAN_CTG_HINTS_SUCCESS, hints });

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

export const fetchRandomCategoryForRandomHints = (categories) => {
    const rand = _.random(0, categories.length ? categories.length : 3)
    const id = categories[rand].id;
    return dispatch => {
        axios.get(`http://jservice.io/api/category?id=${id}`)
        .then(res => {
            console.log(res);

                dispatch(fetchRandomCategoryForRandomHintsSuccess(res.data.clues))
            
        })
        .catch(err => {
            console.log(err);
        })
    }
 

};