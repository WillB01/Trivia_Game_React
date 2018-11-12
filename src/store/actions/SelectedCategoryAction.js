import * as actionTypes from './actionTypes';
import axios from 'axios';
import _ from 'lodash';

export const setSelectedCategory = (selectedCategory, randomCategory) => ({type: actionTypes.FETCH_SELECTED_CATEGORY, selectedCategory, randomCategory});
export const setSelectedCategoryFail = () => ({type: actionTypes.FETCH_SELECTED_CATEGORY_FAIL});
export const newQuestionCards = (isCorrect, userAns) => ({type: actionTypes.SET_NEW_QUESTION_CARDS, isCorrect, userAns});
export const setProgressProgressBar = (progress) => ({ type: actionTypes.SELECTED_CATEGORY_SET_PROGRESS_PROGRESSBAR, progress});
export const resetSelectCategory = () => ({type: actionTypes.RESET_SELECTED_CATEGORY});

export const fetchSelectedCategory = (id, ctg) => {
    const url = `http://jservice.io/api/clues/?category=${id}`;
    return dispatch => {
        axios.get(url)
        .then(res => { 
            dispatch(fetchExtraHints(res.data, ctg, id));
        })
        .catch(err => (dispatch(setSelectedCategoryFail())));
    }

}; // Gets the selected category wich the user picked

export const fetchExtraHints = (resCtg, ctg, id) => {
    // const rand = _.random(0, ctg.categories.length - 1);
    // const newCtg = [...ctg.categories];
    // const uppdatedNewCtg = newCtg.filter(c => c.id !== id);
    // const getRandomId = uppdatedNewCtg[rand].id;
    // const url = `http://jservice.io/api/clues/?category=${getRandomId}`;
    const url = `http://jservice.io/api/random?count=8`;
    return dispatch => {
        axios.get(url)
        .then(res => { 
            dispatch(setSelectedCategory(resCtg ,res.data));
          
        })
        .catch(err => (dispatch(setSelectedCategoryFail())));
    }
}; // gets a random category.
