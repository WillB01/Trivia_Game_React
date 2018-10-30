import React, { Component } from 'react'
import {connect} from 'react-redux';
import PossibleAnswers from '../PossibleAnswers/PossibleAnswers';
import _ from 'lodash';
import styles from './SelectedCategory.module.css';
import * as actions from '../../store/actions/index';
import Timer from '../UI/Timer/Timer';
import ProgressBar from '../UI/ProgressBar/ProgressBar';
import WrongAnswer from '../UI/WrongAnswer/WrongAnswer';
import CompletedCategory from '../UI/CompletedCategory/CompletedCategory';
import IncompleteCategory from '../UI/IncompleteCategory/IncompleteCategory';
import Button from '../UI/Button/Button';

class SelectedCategory extends Component {
    state = {
        startCount: 0,

    };

    componentDidUpdate(prevProps) {
        const percentage = this.percentageCalculator(1, this.props.selectedCtg.length); 
        this.props.onSelectedCategoryCompleted(this.props.location.state.id, this.props.playerScoreSctg);
        if (this.props.triviaMainIsCorrect) {
            this.props.onNewQuestionCard();
            this.props.onProgressProgressBar(percentage);        
        }
    };

    testing = (user, selected) => {  
        this.props.onAnswerClick(user, selected);
        this.props.onNewCards(this.props.triviaMainIsCorrect);
    };

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
                             userAnswerClick={(userAnswer) => this.testing(userAnswer, selectedCategory[index].answer)}
                             gameStart={this.props.triviaMainStartGame}/>
        </div>)) 
           
    }; // returns a question from the array.

    render() {
        
        let selectedCategory = this.props.selectedCtg;
        let questions = [];
        console.log(this.props.selectedCtg);
        
       
        if (selectedCategory) {
            selectedCategory.map((item, index) => {
                this.questionsCreator(selectedCategory, index, (res) => {
                    questions.push(res);
                });
            });
        }

        let button = null;
        if (!this.props.triviaMainStartGame) {
            button = <Button btnType={'Regular'} click={this.props.startGame}>Start Game</Button> 
        }

        let selected = null;
        
        if (this.props.selectedCtg) {
            selected = (
                <React.Fragment>
                { this.props.completeCtg ? <CompletedCategory title={this.props.selectedCtg[0].category.title}/> : null}
               
                 {!this.props.completeCtg && this.props.cards.length === 0 ? <IncompleteCategory title={this.props.selectedCtg[0].category.title} /> : null}
                
                {/* { this.props.completeCtg ? <Redirect to="/completed"/> : null}
                {!this.props.completeCtg && this.props.cards.length === 0 ? <Redirect to="/gameover" /> : null} */}

               {button}
               <div className={styles.QuestionCard}>
                   {this.props.selectedCtg ? questions[this.props.cards[0]] : <p>loading</p>}
                  
                   
               </div>
               <Timer click={this.props.startGame} />
               <WrongAnswer playerAnswer={this.props.playerAnswer}
                            correctAnswer={this.props.correctAnswer}
                            start={this.props.triviaMainStartGame} />
                     
                </React.Fragment>
            )
        }

        return(
            <div>
                {selected}
         </div>
            
            
        );
    };
};

const mapStateToProps = state => {
    return {
        selectedCtg: state.selectedCategory.selectedCategory,
        completeCtg: state.selectedCategory.selectedCategoryCompleted,
        triviaMainIsCorrect: state.triviaMain.isCorrect,
        triviaMainStartGame: state.triviaMain.startGame,
        cards: state.selectedCategory.amountOfCards,
        progressBar: state.selectedCategory.progressBar,
        playerAnswer: state.triviaMain.playerAnswer,
        correctAnswer: state.triviaMain.correctAnswer,
        playerScoreSctg: state.triviaMain.player.score.selectedCategory,
        totalScore: state.triviaMain.player.score.total
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
        addTotalScore: () => dispatch(actions.addTotalScore()),
       
    };
};



export default connect(mapStateToProps,mapDispatchToProps)(SelectedCategory);