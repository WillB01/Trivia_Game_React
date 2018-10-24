import React, { Component } from 'react'
import {connect} from 'react-redux';
import _ from 'lodash';

class Questions extends Component {
    randomNumberGenerator = (length, callback) => {
        if (length === null) {
            console.log('error');
        };
        callback(  _.random(0,length - 1));
    }; // returns a callback with a random number between 0 and length of api array.

    questionsCreator = (selectedCategory) => {
        let num;
        let question;
        console.log(selectedCategory.length);
        this.randomNumberGenerator(selectedCategory.length, (res) => {
           num = res;
        });
        question = selectedCategory[num].question;
        return (
            <React.Fragment>
                <h2>{selectedCategory.title}</h2>
                <p>{question}</p>
            </React.Fragment>
        )
    }; // returns a question from the array.

    render() {
        let selectedCategory = this.props.selectedCtg; 
        let questions = null;

        selectedCategory ? questions = this.questionsCreator(selectedCategory)
        : questions = null;
        return(
            <div>
                {questions}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        selectedCtg: state.categories.selectedCategory 
    };
};

export default connect(mapStateToProps)(Questions);