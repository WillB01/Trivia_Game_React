import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../shared/utility';
import _ from 'lodash';
const RANKSYSTEM = {
    'tenderfoot': ['tenderfoot', 10],
    'noob': ['noob', 100],
    'bronze': ['bronze', 180],
    'silver': ['silver', 300],
    'gold': ['gold', 400],
    'diamond': ['diamond', 600],
}; //rank system points will be compared with completedQuestionsBonus.
const STARTSTATE = {
    isCorrect: false,
    correctAnswer: '',
    playerAnswer: '',
    startGame: false,
    rankSystem: RANKSYSTEM,
    selectedCategoryCompleted: false,
    selectedCategoryGameover: false,
    firstLoggin: true,
    life: 3,
    
    player: {
     name: '',
     id: '',
     hasRank: false,
     rank: '',
     score: {
         total: 0,
         completedQuestionsBonus: 0,
         selectedCategory: 0,
         selectedCategoryCompletedId: [],
     },
     completedCategories: {
         'title': ''
     },
    }
};

const initialState = {
   ...STARTSTATE
};

const compare = (a, b) => ((a === b ? true: false)); // compares something

const correctAnswerSelectedCategory = (state,playerAnswer, correctAnswer, add, addToPoints) => {
    return updateObject(state, { 
        isCorrect: true,
        correctAnswer: correctAnswer,
        playerAnswer: playerAnswer,
        player: {
            ...state.player,
            score: {
                ...state.player.score,
                selectedCategory: state.player.score.selectedCategory += add,
                completedQuestionsBonus: state.player.score.completedQuestionsBonus += addToPoints


            }
        }    
    });
}; // runs on every answer click. adds to player points

const wrongAnswerSelectedCategory = (state, playerAnswer, correctAnswer, remove) => {
         return updateObject(state, {
            isCorrect: false,
            correctAnswer: correctAnswer,
            playerAnswer: playerAnswer,
            life: state.life -= 1,
            player: {
                ...state.player,
                score: {
                    ...state.player.score,
                    completedQuestionsBonus: state.player.score.completedQuestionsBonus - remove,

                }
            }
        });
};  // runs on every answer click. removes to player points


const setPlayerAnswer = (state, action) => { //BAD NAME CHANGE
    const playerAnswer = action.playerAnswer;
    const correctAnswer = action.correctAnswer;
    const remove = 2;
    const add = 1;
    const addToPoints = 5;

    return !compare(playerAnswer, correctAnswer) 
        ? wrongAnswerSelectedCategory(state, playerAnswer, correctAnswer, remove) 
        : correctAnswerSelectedCategory(state, playerAnswer, correctAnswer, add, addToPoints);
   
}; // checks everything that has to do with the game adds SCORE!!!!!!!!



const setStartGame = (state, action) => (updateObject(state, { startGame: true, firstLoggin: false })); // Starts a game

const setResetGame = (state, action) => {
    const oldState = {
        isCorrect: false,
        correctAnswer: '',
        playerAnswer: '',
        startGame: false,
        selectedCategoryCompleted: false,
        selectedCategoryGameover: false,
        life : 3,
        player: {
            ...state.player,
            score: {
                ...state.player.score,
                selectedCategory: 0
               
            }
        }
    };
    return updateObject(state, oldState);
}; //resets state

const setNewQuestionCard = (state, action) => {
    return updateObject(state, {
        isCorrect: false,
        correctAnswer: '',
        playerAnswer: '',
        startGame: true,
    });
}; // resets

const setLoggedInPlayerData = (state, action) => {
    const nameOfObject = Object.keys(action.playerData)[0];
    const player = (action.playerData[nameOfObject]);
    const rank = giveRank(player, action);
    const newPlayer = {
        firstLoggin: true,
        player: {
            ...state.player,
            id: player.id,
            name: player.name,
            hasRank: rank.hasRank,
            rank: rank.rank,
            score: {
                ...state.score,
                total: Number(player.score.total),
                selectedCategory: 0,
                completedQuestionsBonus: Number(player.score.completedQuestionsBonus),
                selectedCategoryCompletedId: player.score.selectedCategoryCompletedId === null ? [] : player.score.selectedCategoryCompletedId
            }
        }

    };
    return updateObject(state, {
       ...newPlayer
    });
};

const newPlayer = (state, action) => {
    const rank = giveRank(state.player, action);
    return updateObject(state, {
        firstLoggin: true,
        player: {
           ...state.player,
           name: action.name,
           hasRank: rank.hasRank,
           rank: rank.rank,

        }
    })
}

const categoryCompletedSuccess = (state, action) => {
    const rank = giveRank(state.player, action);
    const add = 1;
    const ids = state.player.score.selectedCategoryCompletedId;
    ids.push(action.id)
    let noDuplicates = _.uniq(ids)
    return updateObject(state, {
                    rankSystem: RANKSYSTEM,
                    selectedCategoryCompleted: true,
                player: {
                    ...state.player,
                    hasRank: rank.hasRank,
                    rank: rank.rank,
                    score: {
                        ...state.player.score,
                        total: state.player.score.total += add,
                        selectedCategoryCompletedId: noDuplicates,
                    }
                }
    });
}; //when player has completed a category.

const categoryGameOver = (state, action) => {
    const rank = giveRank(state.player, action);
    return updateObject(state, { 
        selectedCategoryCompleted: false,
        selectedCategoryGameover: true,
        player: {
            ...state.player,
            hasRank: rank.hasRank,
            rank: rank.rank,

        }
    });
}; 

const startUpdateDb = (state, action) => ({...state});
const clearStateToLoggout = (state, action) => ({...STARTSTATE});

const giveRank = (player) => {
    const playerBS = player.score.completedQuestionsBonus;
    const ranksSystem = RANKSYSTEM;
    if (playerBS >= ranksSystem.tenderfoot[1] && playerBS < ranksSystem.noob[1]) { // tenderfoot
        return {hasRank: true, rank: ranksSystem.tenderfoot[0]};
    }
    if (playerBS >= ranksSystem.noob[1] && playerBS < ranksSystem.bronze[1]) { // noob
        return {hasRank: true, rank: ranksSystem.noob[0]};
    };
    if (playerBS >= ranksSystem.bronze[1] && playerBS < ranksSystem.silver[1]) { // bronze 
        return {hasRank: true, rank: ranksSystem.bronze[0]};
    };
    if (playerBS >= ranksSystem.silver[1]  && playerBS < ranksSystem.gold[1]) { // silver
        return {hasRank: true, rank: ranksSystem.silver[0]};
    };
    if (playerBS >= ranksSystem.gold[1]  && playerBS < ranksSystem.diamond[1]) { // gold
        return {hasRank: true, rank: ranksSystem.gold[0]};
    };
    if (playerBS >= ranksSystem.diamond[1]) { // diamond
        return {hasRank: true, rank: ranksSystem.diamond[0]};
    };

    return {hasRank: false, rank: ''};
}; // gives a rank based on questionScore

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.TRIVIA_MAIN_GET_PLAYER_ANSWER: return setPlayerAnswer(state, action);
        case actionTypes.STATE_GAME: return setStartGame(state, action);
        case actionTypes.RESET_GAME: return setResetGame(state, action);
        case actionTypes.NEW_QUESTION_CARD:  return setNewQuestionCard(state, action);
        case actionTypes.FETCH_LOGGED_IN_PLAYER_SUCCESS_FROM_AUTH: return setLoggedInPlayerData(state, action);
        case actionTypes.AUTH_CLEAR_STATE_TO_TRIVIA: return clearStateToLoggout(state, action);
        case actionTypes.TRIVIA_MAIN_INIT_PATCH_DB_SUCCESS: return startUpdateDb(state, action);
        case actionTypes.CATEGORY_COMPLETED_SUCCESS_TRIVIA_MAIN: return categoryCompletedSuccess(state, action);
        case actionTypes.CATEGORY_GAMEOVER_TRIVIA_MAIN: return categoryGameOver(state, action); 
        case actionTypes.AUTH_INITIATE_LOGOUT: return clearStateToLoggout(state, action);
        case actionTypes.AUTH_NEW_PLAYER: return newPlayer(state, action);
        default: return state;
    }
};

export default reducer;