import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as k from '../../k';

export const authStart = () => ({type: actionTypes.AUTH_START});
export const authFail = (error) => ({type: actionTypes.AUTH_FAIL, error: error});
const newPlayer = (name) => ({type: actionTypes.AUTH_NEW_PLAYER, name});
const fetchLoggedInPlayerSuccess = (res) => ({type: actionTypes.FETCH_LOGGED_IN_PLAYER_SUCCESS_FROM_AUTH, playerData: res});
export const postPlayerInfoSuccess = () => ({type: actionTypes.TRIVIA_MAIN_POST_PLAYER_SUCCESS});
export const postPlayerInfoFail = (error) => ({type: actionTypes.TRIVIA_MAIN_POST_PLAYER_FAIL});
export const clearStateToTrivia = () => ({type: actionTypes.AUTH_CLEAR_STATE_TO_TRIVIA});

export const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
});
const fetchLoggedInPlayerFail = (err) => {
    return {
        type: actionTypes.AUTH_FETCH_LOGGED_IN_PLAYER_FAIL,
        error: err
    }
};
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};  // removes the nessecary data to be loged in.


export const fetchLoggedInPlayer = (token, id, isSignup) => {
        const url = k.urlWithQuery(token, id);
        return dispatch => {
            if (!isSignup) {
                axios.get(url)
                .then(res => {
                        dispatch(fetchLoggedInPlayerSuccess(res.data))           
                })
                .catch(err =>dispatch(fetchLoggedInPlayerFail(err)));
            } else {
                dispatch(newPlayer())
            }
           

        };
}; //gets the loggedin player data.

export const auth = (email, password, isSignup, name) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${k.key}`
        if(!isSignup) {
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${k.key}`;
        }
       
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);

                dispatch(authSuccess(response.data.idToken, response.data.localId));
                !isSignup ?  dispatch(fetchLoggedInPlayer(response.data.idToken, response.data.localId, isSignup)) : dispatch(newPlayer(name)) ;
               
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
}; // checks if new player or logged in player.

export const authCheckState = (triviaMain) => {
    return dispatch => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            dispatch(logout(triviaMain));
        } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(fetchLoggedInPlayer(token, userId, false));
            }
           
        }
}; //checks if player has a token on localstorage and if true player gets logged in.





