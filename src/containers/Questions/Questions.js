import React, { Component } from 'react'
import {connect} from 'react-redux';
import _ from 'lodash';

class Questions extends Component {
    randomNumberGenerator = (length, callback) => {
        if (length === null) {
            console.log('error');
        };
        callback(  _.random(0,length));
    };
    questionsCreator = (selectedCategory) => {
        let num;
        this.randomNumberGenerator(selectedCategory.length, (res) => {
           num = res;
        });
        return selectedCategory[num].question;
    };

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