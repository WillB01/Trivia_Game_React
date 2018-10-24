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
                <h2 className={styles.Header}>{selectedCategory[0].category.title}</h2>
                <p className={styles.Text}>{selectedCategory[0].question}</p>
                <PossibleAnswers correctAnswer={selectedCategory[0].answer} 
                                 allAnswers={selectedCategory.map(item => item.answer)}
                                 userAnswerClick={this.props.onAnswerClick}/>
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
            <div className={styles.Question}>
                {this.props.selectedCtg ? questions : <p>loading</p>}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        selectedCtg: state.categories.selectedCategory 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAnswerClick: (userAnswer) => dispatch(actions.getPlayerAnswer(userAnswer))
    };
};



export default connect(mapStateToProps,mapDispatchToProps)(SelectedCategory);