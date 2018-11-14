import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchCategoriesSuccess = (categories) => ({type: actionTypes.FETCH_CATEGORIES, categories}); 
export const fetchCategoriesFail = () => ({type: actionTypes.FETCH_CATEGORIES_FAIL});

let offsetStart = 12;
const visibleCategories = 12;
export const pageination = (btnClick) => {
    btnClick === 'more' ? 
        offsetStart += visibleCategories : offsetStart -= visibleCategories;  
     offsetStart = offsetStart <= 0 ? 12 : offsetStart;
}; // gets more or less categories

export const fetchCategories = (btnClick) => {
    pageination(btnClick);
    const url = `http://jservice.io/api/categories?count=${offsetStart}&offset=${0}`;
    return dispatch => {
        axios.get(url)
        .then(res => {       
            dispatch(fetchCategoriesSuccess(res.data, btnClick));
        })
        .catch(error => {
            dispatch(fetchCategoriesFail());
        })
    }
}; // Gets all different categories from API on start


