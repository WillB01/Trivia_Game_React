import React, { Component } from 'react'
import {connect} from 'react-redux';
import _ from 'lodash';
import styles from './SelectedCategory.module.css';
import * as actions from '../../store/actions/index';
import Timer from '../UI/Timer/Timer';
import WrongAnswer from '../UI/WrongAnswer/WrongAnswer';
import CompletedCategory from '../UI/CompletedCategory/CompletedCategory';
import IncompleteCategory from '../UI/IncompleteCategory/IncompleteCategory';
import Button from '../UI/Button/Button';
import Cards from '../UI/Cards/Cards';
import Spinner from '../UI/Spinner/Spinner';

class SelectedCategory extends Component {
    state = {
        startCount: 0,

    };

    componentDidMount() {
       
    };

 
    
    componentDidUpdate(prevProps) {
        const percentage = this.percentageCalculator(1, this.props.selectedCtg.length); 
        // this.props.onSelectedCategoryCompleted(this.props.location.state.id, this.props.playerScoreSctg);
       if (this.props.completeCtg) {
            this.props.history.push(`/completed`);
       }
        
       if (this.props.triviaMainIsCorrect) {
        this.props.onNewQuestionCard();
        this.props.onProgressProgressBar(percentage);        
        }
        this.props.completedCategory(
            this.props.selectedCategory.scoreToCompleteSelectedCategory,
            this.props.selectedCategory.selectedCategoryCompletedId,
            this.props.selectedCategory.amountOfCards,
            this.props.location.state.id);
      
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
        console.log(isCompleted);
        const startGame = this.props.startGame; 
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
                 {isCompleted ? <CompletedCategory title={this.props.selectedCtg[0].category.title}/> : null}
                 {!isCompleted && this.props.cards.length === 0 ? <IncompleteCategory title={this.props.selectedCtg[0].category.title} /> : null}
                
                 <div className={styles.QuestionCard}>
                    {questionsCards[this.props.cards[0]]}
                   
                 </div>
                 {/* <Timer click={startGame} /> */}
               
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
        completeCtg: state.triviaMain.selectedCategoryCompleted,
        triviaMainIsCorrect: state.triviaMain.isCorrect,
        triviaMainStartGame: state.triviaMain.startGame,
        cards: state.selectedCategory.amountOfCards,
        progressBar: state.selectedCategory.progressBar,
        playerAnswer: state.triviaMain.playerAnswer,
        correctAnswer: state.triviaMain.correctAnswer,
        playerScoreSctg: state.triviaMain.player.score.selectedCategory,
        totalScore: state.triviaMain.player.score.total,
        selectedCategory: state.selectedCategory
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAnswerClick: (userAnswer, correctAnswer) => dispatch(actions.getPlayerAnswer(userAnswer, correctAnswer)),
        startGame: () => dispatch(actions.startGame()),
        onNewQuestionCard: () => dispatch(actions.newQuestionCard()),
        onNewCards: (cards) => dispatch(actions.newQuestionCards(cards)),
        onProgressProgressBar: (progress) => dispatch(actions.setProgressProgressBar(progress)),
        onSelectedCategoryCompleted: (id, score) => dispatch(actions.selectedCategoryCompleted(id, score)),
        completedCategory: (scoreToCompleteSelectedCategory, selectedCategoryCompletedId, amountOfCards, id ) => dispatch(actions.completedCategory(scoreToCompleteSelectedCategory, selectedCategoryCompletedId, amountOfCards, id))
        
    };
};

   // scoreToCompleteSelectedCategory,
    // selectedCategoryCompletedId,
    // amountOfCards,
    // id

export default connect(mapStateToProps,mapDispatchToProps)(SelectedCategory);