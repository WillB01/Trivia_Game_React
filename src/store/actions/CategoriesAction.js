import * as actionTypes from './actionTypes';
import axios from 'axios';

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


export const fetchSelectedCategory = (id) => {
    const url = `http://jservice.io/api/clues/?category=${id}`;
    return dispatch => {
        axios.get(url)
        .then(res => {
            console.log(res);
        })
        .catch(err => (dispatch(setSelectedCategoryFail())));
    }

}; // Gets the selected category wich the user picked


export const fetchCategories = () => {
    const url = `http://jservice.io/api/categories?count=8`;
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
