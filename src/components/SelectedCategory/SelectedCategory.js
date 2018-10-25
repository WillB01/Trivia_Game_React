import React, { Component } from 'react'
import {connect} from 'react-redux';
import PossibleAnswers from '../PossibleAnswers/PossibleAnswers';
import _ from 'lodash';
import styles from './SelectedCategory.module.css';
import * as actions from '../../store/actions/index';
import Timer from '../UI/Timer/Timer';

class SelectedCategory extends Component {
    state = {
        startCount: 0
    };

    componentDidUpdate() {
        if (this.props.triviaMainIsCorrect) {
            this.props.onNewQuestionCard();
        };
    }
 
    isNextQuestion = (length, callback) => {
        callback(length);
    };

    // cardLayout = () => {
    //     return(
    //         <React.Fragment>
    //             <h2 className={
    //                 !this.props.triviaMainIsCorrect
    //                 ? styles.Header : styles.HeaderSuccess}>
    //                     {selectedCategory[0].category.title}
    //             </h2>
    //             <p className={styles.Text}>{selectedCategory[num].question}</p>
    //             <PossibleAnswers correctAnswer={selectedCategory[num].answer} 
    //                              allAnswers={selectedCategory.map(item => item.answer)}
    //                              userAnswerClick={(userAnswer) => this.props.onAnswerClick(userAnswer, selectedCategory[0].answer)}/>
    //         </React.Fragment>
    //     );
    // };

    questionsCreator = (selectedCategory) => {
        let num = 0;
        this.isNextQuestion(selectedCategory, (res) => {
            console.log(this.state.startCount);
            if (this.props.triviaMainIsCorrect) {
                setTimeout(() => {
                   
                }, 1000);
             }
            console.log(res[num].question);
           
        });
        return (
            <React.Fragment>
                <h2 className={
                    !this.props.triviaMainIsCorrect
                    ? !this.props.triviaMainStartGame 
                    ? styles.Header : styles.HeaderWrong
                    : styles.HeaderSuccess}>
                        {selectedCategory[num].category.title}
                </h2>
                <p className={styles.Text}>
                    {selectedCategory[num].question}
                </p>
                <PossibleAnswers correctAnswer={selectedCategory[num].answer} 
                                 allAnswers={selectedCategory.map(item => item.answer)}
                                 userAnswerClick={(userAnswer) => this.props.onAnswerClick(userAnswer, selectedCategory[0].answer)}
                                 gameStart={this.props.triviaMainStartGame}/>
            </React.Fragment>
        )
    }; // returns a question from the array.


    render() {
        let selectedCategory = this.props.selectedCtg;
        let questions = undefined;
   
        if (selectedCategory) {
            questions = this.questionsCreator(selectedCategory)
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
                    {this.props.selectedCtg ? questions : <p>loading</p>}
                </div>
                <Timer startTimer={this.props.triviaMainStartGame} />
            </React.Fragment>
            
        );
    };
};

const mapStateToProps = state => {
    return {
        selectedCtg: state.categories.selectedCategory,
        triviaMainIsCorrect: state.triviaMain.isCorrect,
        triviaMainStartGame: state.triviaMain.startGame
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAnswerClick: (userAnswer, correctAnswer) => dispatch(actions.getPlayerAnswer(userAnswer, correctAnswer)),
        startGame: () => dispatch(actions.startGame()),
        onNewQuestionCard: () => dispatch(() => actions.newQuestionCard())
    };
};



export default connect(mapStateToProps,mapDispatchToProps)(SelectedCategory);