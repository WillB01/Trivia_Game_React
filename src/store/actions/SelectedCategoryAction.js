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
            
            // dispatch(fetchExtraHints(id, ctg))
          
        })
        .catch(err => (dispatch(setSelectedCategoryFail())));
    }

}; // Gets the selected category wich the user picked

export const fetchExtraHints = (resCtg, ctg, id) => {
    const rand = _.random(0, ctg.categories.length - 1);
    const newCtg = [...ctg.categories];
    const uppdatedNewCtg = newCtg.filter(c => c.id !== id);
    const getRandomId = uppdatedNewCtg[rand].id;
    console.log(getRandomId);
    console.log(uppdatedNewCtg);
    const url = `http://jservice.io/api/clues/?category=${getRandomId}`;
    return dispatch => {
        axios.get(url)
        .then(res => { 
            console.log(res);
            dispatch(setSelectedCategory(resCtg ,res.data));
            
            // dispatch(fetchExtraHints(id, ctg))
          
        })
        .catch(err => (dispatch(setSelectedCategoryFail())));
    }

};
