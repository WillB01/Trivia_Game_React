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


const newPlayer = (name) => {
    console.log(name);
    return {
        type: actionTypes.AUTH_NEW_PLAYER,
        name
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
        type: actionTypes.AUTH_FETCH_LOGGED_IN_PLAYER_FAIL,
        error: err
    }
};


export const postPlayerInfoSuccess = () => {
    return {
        type: actionTypes.TRIVIA_MAIN_POST_PLAYER_SUCCESS
    };
};

export const postPlayerInfoFail = (error) => {
    return {
        type: actionTypes.TRIVIA_MAIN_POST_PLAYER_FAIL
    };
};

export const clearStateToTrivia = () => {
    return {
        type: actionTypes.AUTH_CLEAR_STATE_TO_TRIVIA
    }
};

// export const logout = (triviaMain) => {
//     const userId = localStorage.getItem('userId');
//     const token = localStorage.getItem('token')
//     const url = k.url(token);
//     const data = {
//         [userId]: {
//             name: triviaMain.player.name,
//             hasRank: triviaMain.player.hasRank,
//             rank: triviaMain.player.rank,
//             id: userId,
//             score: {
//                 total: triviaMain.player.score.total,
//                 completedQuestionsBonus: triviaMain.player.score.completedQuestionsBonus,
//                 selectedCategoryCompletedId: triviaMain.player.score.selectedCategoryCompletedId.length === 0 ? ['none'] :  triviaMain.player.score.selectedCategoryCompletedId
//             }
//         }
       

//     };
    
//     return dispatch => {
//         axios.patch(url,data)
//             .then(res => {
//                 console.log(res.data);
//                 // dispatch(clearStateToTrivia())
//                 dispatch(loggingOut())

//             })
//             .catch(err => {
//                 dispatch(postPlayerInfoFail(err));
//             });
//     };
// }; // post the core before logout!

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
    console.log(isSignup);
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
                !isSignup ?  dispatch(fetchLoggedInPlayer(response.data.idToken, response.data.localId, isSignup)) : dispatch(newPlayer(name)) ;
               
            })
            .catch(err => {
                console.log(err);
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
                dispatch(fetchLoggedInPlayer(token, userId));
            }
           
        }
}; //checks if player has a token on localstorage and if true player gets logged in.



