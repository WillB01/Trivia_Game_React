import * as actionTypes from './actionTypes';
import _ from 'lodash';
import axios from 'axios';

//different action creators---------------------------------------
export const setCategories = (categories) => {
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


export const fetchCategories = (num) => {
    const url = `http://jservice.io/api/categories?count=${32}&offset=${0}`;
    return dispatch => {
        axios.get(url)
        .then(res => {
            dispatch(setCategories(res.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchCategoriesFail());
        })
    }
}; // Gets all different categories from API


