import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../shared/utility';
const RANKSYSTEM = {
    'noob': ['noob', 5],
    'bronze': ['bronze', 20],
    'silver': ['silver', 35],
    'gold': ['gold', 50],
    'dimond': ['dimond', 100],
}; //rank system points will be compared with completedQuestionsBonus.

const initialState = {
   isCorrect: false,
   correctAnswer: '',
   playerAnswer: '',
   startGame: false,
   rankSystem: RANKSYSTEM,
   
   player: {
    name: 'Willy',
    hasRank: false,
    rank: '',
    score: {
        total: 0,
        completedQuestionsBonus: 0,
        selectedCategory: 0,
    },
    completedCategories: {
        'title': ''
    },


   }
};


const compare = (a, b) => {
    return (a === b ? true: false);
}; // compares something


const setPlayerAnswer = (state, action) => { //BAD NAME CHANGE
    const playerAnswer = action.playerAnswer;
    const correctAnswer = action.correctAnswer;
    const remove = 10;
    const add = 1;
    const addToPoints = 5;

    
    if (!compare(playerAnswer, correctAnswer)) {
        return updateObject(state, {
            isCorrect: false,
            correctAnswer: correctAnswer,
            playerAnswer: playerAnswer,
            player: {
                ...state.player,
                score: {
                    ...state.player.score,
                    completedQuestionsBonus: state.player.score.completedQuestionsBonus - remove,

                }
            }
        });
    }; // checks if player answer is correct. if incorrect returns FALSE


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
}; // checks everything that has to do with the game adds SCORE!!!!!!!!

const setStartGame = (state, action) => {
    return updateObject(state, {startGame: true})
}; // Starts a game

const setResetGame = (state, action) => {
    const oldState = {
        isCorrect: false,
        correctAnswer: '',
        playerAnswer: '',
        startGame: false,
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
};

const setAddTotalScore = (state, action) => {
    const rank = giveRank(state, action);
    const add = 1;
    
    return {
        rankSystem: RANKSYSTEM,
        player: {
            ...state.player,
            hasRank: rank.hasRank,
            rank: rank.rank,
            score: {
                ...state.player.score,
                total: state.player.score.total += add,
                completedCategories: []


            },
          
        }    
    }
};  // if player completed a whole category! gives RANK and TOTAL.  updates on trivia componentDidMounth

const giveRank = (state) => {
    const playerBS = state.player.score.completedQuestionsBonus;
    const ranksSystem = state.rankSystem;
    
    if (playerBS >= ranksSystem.noob[1] && playerBS < ranksSystem.bronze[1]) { // noob
        return {hasRank: true, rank: ranksSystem.noob[0]};
    };
    if (playerBS >= ranksSystem.bronze[1] && playerBS < ranksSystem.silver[1]) { // bronze 
        return {hasRank: true, rank: ranksSystem.bronze[0]};
    };
    if (playerBS >= ranksSystem.silver[1]  && playerBS < ranksSystem.gold[1]) { // silver
        return {hasRank: true, rank: ranksSystem.silver[0]};
    };
    if (playerBS >= ranksSystem.gold[1]  && playerBS < ranksSystem.dimond[1]) { // gold
        return {hasRank: true, rank: ranksSystem.gold[0]};
    };
    if (playerBS >= ranksSystem.dimond[1]) { // dimond
        alert(playerBS + ' ' +  ranksSystem.dimond[1])
        return {hasRank: true, rank: ranksSystem.dimond[0]};
    };

    return {hasRank: state.player.hasRank, rank: state.player.rank};
}; //  gets called at setAddTotalScore(). gives a rank based on questionScore

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.GET_PLAYER_ANSWER) {
        return setPlayerAnswer(state, action);
    }
    if (action.type === actionTypes.STATE_GAME) {
        return setStartGame(state, action);
    }
    if (action.type === actionTypes.RESET_GAME) {
        return setResetGame(state, action);
    }
    if (action.type === actionTypes.NEW_QUESTION_CARD) {
            return setNewQuestionCard(state, action);
    }
    if (action.type === actionTypes.ADD_TOTAL_SCORE) {
        return setAddTotalScore(state, action);
    }
    return state;
};

export default reducer;