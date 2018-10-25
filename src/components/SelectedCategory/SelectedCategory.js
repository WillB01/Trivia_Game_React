import React, { Component } from 'react'
import {connect} from 'react-redux';
import PossibleAnswers from '../PossibleAnswers/PossibleAnswers';
import _ from 'lodash';
import styles from './SelectedCategory.module.css';
import * as actions from '../../store/actions/index';
import Timer from '../UI/Timer/Timer';

class SelectedCategory extends Component {
    state = {
        startCount: 0,
    };

    componentDidUpdate() {
        if (this.props.triviaMainIsCorrect) {
            this.props.onNewQuestionCard();
            this.props.onNewCards();
            this.props.onProgressProgressBar(20); //must change arg
        }
    }

     progressBar = () => { 
         let background = this.props.progressBar ? '#018E5B' : 'white';
        return{
                background,
                height: '30px',
                width: `${this.props.progressBar}%` 
        };
    };
      
    
    questionsCreator = (selectedCategory, index, callback) => {
        callback((  <div key={index} className={styles.QuestionCard}>
            <h2 className={styles.Header}>
                    {selectedCategory[index].category.title}
            </h2>
            <div style={this.progressBar()}></div>
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
        selectedCtg: state.categories.selectedCategory,
        triviaMainIsCorrect: state.triviaMain.isCorrect,
        triviaMainStartGame: state.triviaMain.startGame,
        cards: state.categories.amountOfCards,
        progressBar: state.categories.progressBar
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAnswerClick: (userAnswer, correctAnswer) => dispatch(actions.getPlayerAnswer(userAnswer, correctAnswer)),
        startGame: () => dispatch(actions.startGame()),
        onNewQuestionCard: () => dispatch(actions.newQuestionCard()),
        onNewCards: (cards) => dispatch(actions.newQuestionCards(cards)),
        onProgressProgressBar: (progress) => dispatch(actions.setProgressProgressBar(progress))
    };
};



export default connect(mapStateToProps,mapDispatchToProps)(SelectedCategory);