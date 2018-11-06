import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as k from '../../k';

//different action creators---------------------------------------
export const fetchCategoriesSuccess = (categories) => ({type: actionTypes.FETCH_CATEGORIES, categories}); 
export const fetchCategoriesFail = () => ({type: actionTypes.FETCH_CATEGORIES_FAIL});
export const fetchImagesSuccess = (images) => ({type: actionTypes.FETCH_IMAGES_SUCCESS_CATEGORIES, images})
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
            dispatch(fetchCategoriesSuccess(res.data, btnClick));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchCategoriesFail());
        })
    }
}; // Gets all different categories from API on start

export const fetchImagesForCategories = (completed) => {
    // const uri = 'the secret lives of teachers';
    // const res = encodeURI(uri);

    // axios.all([
    //     axios.get('http://google.com'),
    //     axios.get('http://apple.com')
    //   ])
    //   .then(axios.spread((googleRes, appleRes) => {
    //     // do something with both responses
    //   })
    //   .catch(err => {console.log(err)}));
    if (completed !== undefined) {
        console.log(completed.split(' ')[2])
        let url = `https://pixabay.com/api/?key=${k.pexakey}&q=${'travles'}&image_type=vector&per_page=3`;
        return dispatch => {
            axios.get(url)
                .then(res => {
                    console.log(res.data)
                    dispatch(fetchImagesSuccess(res.data))
                })
                .catch(error => {
                    console.log(error);
                })
        };
    }
  
   
    // let korv = true;
    // if (korv) {
    //     url = `https://pixabay.com/api/?key=${k.pexakey}&q=flower&image_type=vector&per_page=3`
    //     korv = false
    // }
    
    // var mainObject = {},
    // promises = [];

    // completed.forEach(function (singleElement) {
    //     myUrl = singleElement.webAddress;
    //     promises.push(axios.get(myUrl))
    // });

    // axios.all(promises).then(function (results) {
    //     results.forEach(function (response) {
    //         mainObject[response.identifier] = response.value;
    //     })
    // });

    // console.log(convertToStringValue(mainObject));



       

       
    
};


