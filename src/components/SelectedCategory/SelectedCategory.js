import React, { Component } from 'react'
import {connect} from 'react-redux';
import PossibleAnswers from '../PossibleAnswers/PossibleAnswers';
import _ from 'lodash';
import styles from './SelectedCategory.module.css';
import * as actions from '../../store/actions/index';

class SelectedCategory extends Component {
    randomNumberGenerator = (length, callback) => {
        if (length === null) {
            console.log('error');
        };
        callback(  _.random(0,length));
    }; // returns a callback with a random number between 0 and length of api array.

    questionsCreator = (selectedCategory) => {
        let num;
        this.randomNumberGenerator(selectedCategory.length, (res) => {
           num = res;
        });
        return (
            <React.Fragment>
                <h2 className={
                    !this.props.triviaMainIsCorrect
                    ? styles.Header : styles.HeaderSuccess}>
                        {selectedCategory[0].category.title}
                </h2>
                <p className={styles.Text}>{selectedCategory[0].question}</p>
                <PossibleAnswers correctAnswer={selectedCategory[0].answer} 
                                 allAnswers={selectedCategory.map(item => item.answer)}
                                 userAnswerClick={(userAnswer) => this.props.onAnswerClick(userAnswer, selectedCategory[0].answer)}/>
            </React.Fragment>
        )
    }; // returns a question from the array.


    render() {
        let selectedCategory = this.props.selectedCtg;
        let questions = undefined;
   
        if (selectedCategory) {
            questions = this.questionsCreator(selectedCategory)
            console.log(selectedCategory);
        }
        return(
            <React.Fragment>
                 <button onClick={this.props.startGame}>Start Game</button>  
                <div className={styles.QuestionCard}>
                    {this.props.selectedCtg ? questions : <p>loading</p>}
                </div>
            </React.Fragment>
            
        );
    };
};

const mapStateToProps = state => {
    return {
        selectedCtg: state.categories.selectedCategory,
        triviaMainIsCorrect: state.triviaMain.isCorrect
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAnswerClick: (userAnswer, correctAnswer) => dispatch(actions.getPlayerAnswer(userAnswer, correctAnswer)),
        startGame: () => dispatch(actions.startGame())
    };
};



export default connect(mapStateToProps,mapDispatchToProps)(SelectedCategory);