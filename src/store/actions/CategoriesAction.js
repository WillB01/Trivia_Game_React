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

export const fetchMoreCategories = () => {
    return {
        type: actionTypes.FETCH_MORE_CATEGORIES
    };
};

export const newQuestionCards = (cards) => {
    return {
        type: actionTypes.SET_NEW_QUESTION_CARDS,
        cards

    }
}

export const setProgressProgressBar = (progress) => {
    return {
        type: actionTypes.SET_PROGRESS_PROGRESSBAR,
        progress
    }
};

//---------------------------------------------------------------

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


