import React, { Component } from 'react'
import {connect} from 'react-redux';
import styles from './SelectedCategory.module.css';
import * as actions from '../../store/actions/index';
import WrongAnswer from '../../components/UI/WrongAnswer/WrongAnswer';
import IncompleteCategory from '../../components/UI/IncompleteCategory/IncompleteCategory';
import Button from '../../components/UI/Button/Button';
import Cards from '../../components/UI/Cards/Cards';
import Spinner from '../../components/UI/Spinner/Spinner';
import CompletedCategory from '../../components/UI/CompletedCategory/CompletedCategory';

class SelectedCategory extends Component {
    // componentWillUnmount() {
    //     console.log('[unmount]')
    //     if (this.props.cards.length === 0) {
    //         this.props.completedCategory(
    //             this.props.selectedCategory.scoreToCompleteSelectedCategory,
    //             this.props.selectedCategory.selectedCategoryCompletedId,
    //             this.props.selectedCategory.amountOfCards,
    //             this.props.location.state.id);
    //             this.props.history.push(`/completed`);
           
    
    //         if (this.props.cards.length === 0 && !this.props.completeCtg) {
    //             this.props.onResetSelectCategory();
    //             this.props.history.push(`/gameover`);
    //         }
    //     };
      
    // }
    compnentDidMount() {
        console.log('[didMount]');
    };
    componentDidUpdate() {
        console.log(this.props.completeCtg);
        console.log(this.props.cards.length);
        console.log(this.props.selectCtgScore);
        const percentage = this.percentageCalculator(1, this.props.selectedCtg.length);
 
       if (this.props.triviaMainIsCorrect) {
        this.props.onNewQuestionCard();
        this.props.onProgressProgressBar(percentage);   
        }
        this.props.onCheckIfCategoryCompleted( 
            this.props.selectedCategory.scoreToCompleteSelectedCategory,
            this.props.selectedCategory.selectedCategoryCompletedId,
            this.props.selectedCategory.amountOfCards,
            this.props.location.state.id,
            this.props.selectCtgScore,
            this.props.completeCtg
        );
        if (this.props.completeCtg) {
            this.props.onResetSelectCategory();
            this.props.history.push(`/completed`);
        }
        if (this.props.isGameOver) {
            this.props.onResetSelectCategory();
            this.props.history.push(`/gameover`);
        }
    };

    playerAnswerClickHandler = (user, selected) => {  
        this.props.onAnswerClick(user, selected);
        this.props.onNewCards(this.props.triviaMainIsCorrect);
        
    };

    percentageCalculator = (a, b) => (a / b) * 100; // calculate the precentage for the progressbar.
    
    QuestionCardsCreator = (selectedCategory, index, callback) => {
        callback((  
        < Cards selectedCategory={selectedCategory}
                index={index}  
                progressBar={this.props.progressBar}
                triviaMainStartGame={this.props.triviaMainStartGame}
                playerAnswerClickHandler={(userAnswer, answer) => this.playerAnswerClickHandler(userAnswer, answer)}
                />
        )) 
           
    }; // returns a question from the array.

    render() {
        const selectedCategory = this.props.selectedCtg;
        const isCompleted = this.props.completeCtg; 
        let selected = < Spinner /> ;
        let questionsCards = [];    
        let button = null;    
  
        if (selectedCategory) {
            selectedCategory.map((item, index) => {
                this.QuestionCardsCreator(selectedCategory, index, (res) => {
                    questionsCards.push(res);;
                });
            });
            console.log(selectedCategory);
            selected = (
                <React.Fragment>
                     {/* {isCompleted && this.props.cards.length === 0 ? <CompletedCategory title={this.props.selectedCtg[0].category.title} /> : null}  
                 {!isCompleted && this.props.cards.length === 0 ? <IncompleteCategory title={this.props.selectedCtg[0].category.title} /> : null}        */}
                 <div className={styles.QuestionCard}>
                    {questionsCards[this.props.cards[0]]}          
                 </div>
                </React.Fragment>
            )
        }
        if (!this.props.triviaMainStartGame) {
            button = <Button btnType={'Regular'} 
            click={this.props.startGame}>Start Game</Button> 
        }
        return(
            <div className={styles.SelectedCategory}>
                {button}
                {selected}
                <WrongAnswer playerAnswer={this.props.playerAnswer}
                              correctAnswer={this.props.correctAnswer}
                              start={this.props.triviaMainStartGame} />
                
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        selectedCtg: state.selectedCategory.selectedCategory,
        cards: state.selectedCategory.amountOfCards,
        progressBar: state.selectedCategory.progressBar,
        selectedCategory: state.selectedCategory,
        playerAnswer: state.triviaMain.playerAnswer,
        correctAnswer: state.triviaMain.correctAnswer,
        completeCtg: state.triviaMain.selectedCategoryCompleted,
        triviaMainIsCorrect: state.triviaMain.isCorrect,
        triviaMainStartGame: state.triviaMain.startGame,
        selectCtgScore: state.triviaMain.player.score.selectedCategory,
        isGameOver: state.triviaMain.selectedCategoryGameover
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAnswerClick: (userAnswer, correctAnswer) => dispatch(actions.getPlayerAnswer(userAnswer, correctAnswer)),
        startGame: () => dispatch(actions.startGame()),
        onNewQuestionCard: () => dispatch(actions.newQuestionCard()),
        onNewCards: (cards) => dispatch(actions.newQuestionCards(cards)),
        onProgressProgressBar: (progress) => dispatch(actions.setProgressProgressBar(progress)),
        completedCategory: (scoreToCompleteSelectedCategory, selectedCategoryCompletedId, amountOfCards, id ) => dispatch(actions.completedCategory(scoreToCompleteSelectedCategory, selectedCategoryCompletedId, amountOfCards, id)),
        onResetSelectCategory: () => dispatch(actions.resetSelectCategory()),
        onCheckIfCategoryCompleted: (scoreToComplete, selCtgId, cards, id, score, isCompleteCtg) => dispatch(actions.checkIfCategoryCompleted(scoreToComplete, selCtgId, cards, id, score, isCompleteCtg))
        
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(SelectedCategory);

// this.props.selectedCategory.scoreToCompleteSelectedCategory,
// this.props.selectedCategory.selectedCategoryCompletedId,
// this.props.selectedCategory.amountOfCards,
// this.props.location.state.id,
// this.props.selectCtgScore