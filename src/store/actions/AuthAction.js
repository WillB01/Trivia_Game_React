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

export const mock = () => {
    return {
        type: actionTypes.MOCK
    }
};

export const logout = (triviaMain) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
    const url = k.url(token);
    const data = {
        [userId]: {
            name: triviaMain.player.name,
            hasRank: triviaMain.player.hasRank,
            rank: triviaMain.player.rank,
            id: userId,
            score: {
                total: triviaMain.player.score.total,
                completedQuestionsBonus: triviaMain.player.score.completedQuestionsBonus,
                selectedCategoryCompletedId: triviaMain.player.score.selectedCategoryCompletedId.length === 0 ? ['none'] :  triviaMain.player.score.selectedCategoryCompletedId
            }
        }
       

    };

    // console.log(url);
    // const test = {
    //     'test': 'nice'
    // }
    // return dispatch => {
    //     dispatch(mock());
    // }
    return dispatch => {
        axios.patch(url,data)
            .then(res => {
                console.log(res.data);
                dispatch(clearStateToTrivia())
                dispatch(loggingOut())

            })
            .catch(err => {
                dispatch(postPlayerInfoFail(err));
            });
    };
}; // post the core before logout!

export const loggingOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};  // removes the nessecary data to be loged in.

export const clearStateToTrivia = () => {
    return {
        type: actionTypes.AUTH_CLEAR_STATE_TO_TRIVIA
    }
}


export const checkAuthTimeout = (exirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },exirationTime * 1000);
    };
}; //checks 


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
};

const newPlayer = () => {
    return {
        type: actionTypes.AUTH_NEW_PLAYER
    };
};


const fetchLoggedInPlayerSuccess = (res) => {
    return {
        type: actionTypes.FETCH_LOGGED_IN_PLAYER_SUCCESS_FROM_AUTH,
        playerData: res
    }
};

const fetchLoggedInPlayerFail = (err) => {
    console.log(err);
    return {
        type: actionTypes.FETCH_LOGGED_IN_PLAYER_FAIL,
        error: err
    }
};


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
                // console.log(response.data.idToken);
                // console.log( response.data.localId);
               
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
                dispatch(fetchLoggedInPlayer(response.data.idToken, response.data.localId, isSignup));
               
       
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



