import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as k from '../../k';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = (triviaMain) => {
    console.log(triviaMain);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
}; // romeves the nessecary data to be loged in.

export const checkAuthTimeout = (exirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },exirationTime * 1000);
    };
}; //checks 

export const auth = (email, password, isSignup) => {
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
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};
export const authCheckState = (triviaMain) => {
    return dispatch => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            dispatch(logout(triviaMain));
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout(triviaMain));
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)); 
            }
           
        }
    };  
};


export const postPlayerInfoSuccess = () => {
    return {
        type: actionTypes.POST_PLAYER_SUCCESS
    };
};

export const postPlayerInfoFail = (error) => {
    return {
        type: actionTypes.POST_PLAYER_FAIL
    };
};

export const postPlayerInfo = () => {
    const test = {
        'test': 'kewl'
    }
    return dispatch => {
        axios.post(k.url,test)
            .then(res => {
                console.log(res.data);
                dispatch(postPlayerInfoSuccess())
            })
            .catch(err => {
                dispatch(postPlayerInfoFail(err));
            });
    };
};


