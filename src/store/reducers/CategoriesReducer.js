import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../shared/utility';


const initialState = {
    categories: null,
    error: false,
    img: ''
};


const setCategories = (state, action)  => {
    return updateObject(state, {
        categories: action.categories
    });
};

const setImage = (state, action) => {
    return updateObject(state, {
        img: action.images.hits[0].webformatURL
    });
};

const fetchCategoriesFail = (state, action) => {
    return updateObject(state, {
        error: true
    });
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.FETCH_CATEGORIES) {
        return setCategories(state, action);
    }
    if (action.type === actionTypes.FETCH_CATEGORIES_FAIL) {
        return fetchCategoriesFail(state, action);
    }
    if (action.type === actionTypes.FETCH_IMAGES_SUCCESS_CATEGORIES) {
        return setImage(state, action);
    }

    return state;
};

export default reducer;