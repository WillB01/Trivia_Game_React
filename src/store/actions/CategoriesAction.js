import * as actionTypes from './actionTypes';
import axios from 'axios';

//different action creators---------------------------------------
export const setCategories = (categories, btnClick) => {
    return {
        type: actionTypes.FETCH_CATEGORIES,
        categories
    };
}; 

export const fetchCategoriesFail = () => {
    return {
        type: actionTypes.FETCH_CATEGORIES_FAIL
    };
};
//---------------------------------------------------------------


let offsetStart = 12;
const visibleCategories = 12;

export const pageination = (btnClick) => {
    if (btnClick === 'more') {
        offsetStart += visibleCategories;
     } else if (btnClick === 'less') {
        offsetStart -= visibleCategories;
     }
     
     offsetStart = offsetStart <= 0 ? 0 : offsetStart;
}; // gets more or less categories

export const fetchCategories = (btnClick) => {
    pageination(btnClick);
    const url = `http://jservice.io/api/categories?count=${offsetStart}&offset=${0}`;
    return dispatch => {
        axios.get(url)
        .then(res => {       
            dispatch(setCategories(res.data, btnClick));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchCategoriesFail());
        })
    }
}; // Gets all different categories from API on start


