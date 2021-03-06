import React, { Component } from 'react'
import {connect} from 'react-redux';
import styles from './SelectedCategory.module.css';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import Cards from '../../components/UI/Cards/Cards';
import Spinner from '../../components/UI/Spinner/Spinner';

class SelectedCategory extends Component {
    componentDidUpdate() {
       const cards = this.props.selectedCtg ? this.props.selectedCtg.length  : 0;
       const percentage = this.percentageCalculator(1, cards);
       if (this.props.triviaMainIsCorrect) { // resets triviaMain state for user answer and correct answer. adds to progressBar
            this.props.onNewQuestionCard();
            this.props.onProgressProgressBar(percentage);   
        }
        
        this.props.onCheckIfCategoryCompleted( 
            this.props.selectedCategory.scoreToCompleteSelectedCategory,
            this.props.selectedCategory.amountOfCards,
            this.props.location.state.id,
            this.props.completeCtg,    
            this.props.life
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
        this.props.onNewCards(user === selected, user);    
    };
    percentageCalculator = (a, b) => (a / b) * 100; // calculate the precentage for the progressbar.
    
    QuestionCardsCreator = (selectedCategory, index, callback) => {
        callback((  
        < Cards selectedCategory={selectedCategory}
                index={index}  
                progressBar={this.props.progressBar}
                triviaMainStartGame={this.props.triviaMainStartGame}
                playerAnswerClickHandler={(userAnswer, answer) => this.playerAnswerClickHandler(userAnswer, answer)}
                answers={this.props.answers}
                cardsRemaining={`${this.props.amountOfCardsPlayed.length} / ${this.props.cardsStatic.length}`}
                cardsPlayed={this.props.amountOfCardsPlayed.length}
                />
        )) 
           
    }; // returns a question from the array.

    render() {
        const selectedCategory = this.props.selectedCtg;
        let selected = < Spinner /> ;
        let questionsCards = [];    
        let button = null;     
        if (selectedCategory) {
            selectedCategory.map((item, index) => {
                this.QuestionCardsCreator(selectedCategory, index, (res) => {
                    questionsCards.push(res);;
                });
            });
            selected = (
                <React.Fragment>
                    <div className={`${styles.QuestionCard } fadeInDownBig`}>
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
                {this.props.triviaMainStartGame ? selected : 
                <div className={`${styles.CardBlocker } flipInY`}>
                {button}
                <br></br>
                </div>}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        // selected category state
        selectedCtg: state.selectedCategory.selectedCategory,
        hints: state.selectedCategory.hints,
        cards: state.selectedCategory.amountOfCards,
        amountOfCardsPlayed: state.selectedCategory.amountOfCardsPlayed,
        cardsStatic: state.selectedCategory.selectedCategory,
        progressBar: state.selectedCategory.progressBar,
        answers: state.selectedCategory.answers,
        selectedCategory: state.selectedCategory,
        // triviamain state
        playerAnswer: state.triviaMain.playerAnswer,
        correctAnswer: state.triviaMain.correctAnswer,
        completeCtg: state.triviaMain.selectedCategoryCompleted,
        triviaMainIsCorrect: state.triviaMain.isCorrect,
        triviaMainStartGame: state.triviaMain.startGame,
        selectCtgScore: state.triviaMain.player.score.selectedCategory,
        isGameOver: state.triviaMain.selectedCategoryGameover,
        life: state.triviaMain.life,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAnswerClick: (userAnswer, correctAnswer) => dispatch(actions.getPlayerAnswer(userAnswer, correctAnswer)),
        startGame: () => dispatch(actions.startGame()),
        onNewQuestionCard: () => dispatch(actions.newQuestionCard()),
        onNewCards: (isCorrect, userAns) => dispatch(actions.newQuestionCards(isCorrect, userAns)),
        onProgressProgressBar: (progress) => dispatch(actions.setProgressProgressBar(progress)),
        onResetSelectCategory: () => dispatch(actions.resetSelectCategory()),
        onCheckIfCategoryCompleted: (scoreToComplete, cards, id, isCompleteCtg, life) => dispatch(actions.checkIfCategoryCompleted(scoreToComplete, cards, id, isCompleteCtg, life)),
        
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(SelectedCategory);

