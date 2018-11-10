export {
    fetchCategories,
    fetchImagesForCategories
} from './CategoriesAction';
export {
    fetchSelectedCategory,
    newQuestionCards,
    setProgressProgressBar,
    resetSelectCategory,
    fetchRandomCategoryForRandomHints
} from './SelectedCategoryAction'
export {
    getPlayerAnswer,
    startGame,
    resetGame,
    newQuestionCard,
    initPatchdDb,
    checkIfCategoryCompleted
    
   
} from './TriviaMainAction'
export {
    fetchHighScore
} from './HighScoreAction'
export {
    auth,
    logout,
    authCheckState,
} from './AuthAction';

