import React, { Component } from 'react'
import {connect} from 'react-redux';
import PossibleAnswers from '../PossibleAnswers/PossibleAnswers';
import _ from 'lodash';
import styles from './SelectedCategory.module.css';
import * as actions from '../../store/actions/index';
import Timer from '../UI/Timer/Timer';
import ProgressBar from '../UI/ProgressBar/ProgressBar';

class SelectedCategory extends Component {
    state = {
        startCount: 0,

    };

    componentDidUpdate() {
        const percentage = this.percentageCalculator(1, this.props.selectedCtg.length); 
        if (this.props.triviaMainIsCorrect) {
            this.props.onNewQuestionCard();
            this.props.onNewCards();
            this.props.onProgressProgressBar(percentage);    
            this.playerCompletedCategory();  
        }
    };

    playerCompletedCategory = () => {
        if (this.props.cards.length === 1) {
            this.props.onSelectedCategoryCompleted(this.props.location.state.id);
            this.props.addTotalScore();
        }
    }; // checks if player has completed all cards if true it means category completed


    percentageCalculator = (a, b) => (a / b) * 100; // calculate the precentage for the status bar.
    
    questionsCreator = (selectedCategory, index, callback) => {
        callback((  <div key={index} className={styles.QuestionCard}>
            <h2 className={styles.Header}>
                    {selectedCategory[index].category.title}
            </h2>
            <ProgressBar progressBar={this.props.progressBar} />
            <p className={styles.Text}>
                {selectedCategory[index].question}
            </p>
            <PossibleAnswers correctAnswer={selectedCategory[index].answer} 
                             allAnswers={selectedCategory.map(item => item.answer)}
                             userAnswerClick={(userAnswer) => this.props.onAnswerClick(userAnswer, selectedCategory[index].answer)}
                             gameStart={this.props.triviaMainStartGame}/>
        </div>)) 
           
    }; // returns a question from the array.

    render() {
        let selectedCategory = this.props.selectedCtg;
        let questions = [];
        
       
        if (selectedCategory) {
            selectedCategory.map((item, index) => {
                this.questionsCreator(selectedCategory, index, (res) => {
                    questions.push(res);
                });
            });
        }

        let button = null;
        if (!this.props.triviaMainStartGame) {
            button = <button onClick={this.props.startGame}>
                   START GAME
                </button>  ;
        }
        return(
            <React.Fragment>
                {button}
                <div className={styles.QuestionCard}>
                    {this.props.selectedCtg ? questions[this.props.cards[0]] : <p>loading</p>}
                </div>
            </React.Fragment>
            
        );
    };
};

const mapStateToProps = state => {
    return {
        selectedCtg: state.selectedCategory.selectedCategory,
        triviaMainIsCorrect: state.triviaMain.isCorrect,
        triviaMainStartGame: state.triviaMain.startGame,
        cards: state.selectedCategory.amountOfCards,
        progressBar: state.selectedCategory.progressBar
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAnswerClick: (userAnswer, correctAnswer) => dispatch(actions.getPlayerAnswer(userAnswer, correctAnswer)),
        startGame: () => dispatch(actions.startGame()),
        onNewQuestionCard: () => dispatch(actions.newQuestionCard()),
        onNewCards: (cards) => dispatch(actions.newQuestionCards(cards)),
        onProgressProgressBar: (progress) => dispatch(actions.setProgressProgressBar(progress)),
        onSelectedCategoryCompleted: (id) => dispatch(actions.selectedCategoryCompleted(id)),
        addTotalScore: () => dispatch(actions.addTotalScore())
    };
};



export default connect(mapStateToProps,mapDispatchToProps)(SelectedCategory);