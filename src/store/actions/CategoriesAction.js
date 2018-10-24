import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setCategories = (categories) => {
    return {
        type: actionTypes.SET_CATEGORIES,
        categories
    };
};

export const fetchCategoriesFail = () => {
    return {
        type: actionTypes.FETCH_CATEGORIES_FAIL
    };
};



export const fetchCategories = () => {
    const url = `http://jservice.io/api/categories?count=5`;
    return dispatch => {
        axios.get(url)
        .then(res => {
            console.log(res.data);
            dispatch(setCategories(res.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchCategoriesFail());
        })
    }
};
