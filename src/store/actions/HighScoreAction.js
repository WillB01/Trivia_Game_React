import axios from 'axios';
import * as k  from '../../k';

const fetchHighScoreSuccess = () => ({});
export const fetchHighScore = () => {
    const token = localStorage.getItem('token');
    const url =  k.urlGetHighScore(); 
    return dispatch => axios.get(url)
        .then(res => {
            console.log(res);
            dispatch(fetchHighScoreSuccess())
        })
        .catch(err => {
            console.log(err);
        })
}