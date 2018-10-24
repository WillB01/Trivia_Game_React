import React, { Component } from 'react'
import {connect} from 'react-redux';
import _ from 'lodash';

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
        return selectedCategory[num].question;
    }; // returns a question from the array.


    render() {
        let selectedCategory = this.props.selectedCtg;
        let questions = null;

        selectedCategory ? questions = this.questionsCreator(selectedCategory)
        : questions = null;
        console.log(selectedCategory);
        return(
            <div>
                {/* {selectedCategory.title} */}
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

export default connect(mapStateToProps)(SelectedCategory);