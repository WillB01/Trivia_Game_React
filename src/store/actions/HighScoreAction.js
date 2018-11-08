import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as k  from '../../k';

const fetchHighScoreSuccess = (highscore) => ({type: actionTypes.FETCH_HIGHSCORES_SUCCESS, highscore});
const fetchHighScoreFail = (error) => ({type: actionTypes.FETCH_HIGHSCORES_FAIL, error});

export const fetchHighScore = () => {
    const token = localStorage.getItem('token');
    const url =  k.urlGetHighScore(token); 
    return dispatch => axios.get(url)
        .then(res => {
            console.log(res);
            dispatch(fetchHighScoreSuccess(res.data))
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchHighScoreFail(err));
        })
}