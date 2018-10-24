import React, { Component } from 'react'
import {connect} from 'react-redux';
import _ from 'lodash';
import styles from './SelectedCategory.module.css';

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
            </React.Fragment>
        )
    }; // returns a question from the array.


    render() {
        let selectedCategory = this.props.selectedCtg;
        let questions = null;

        selectedCategory ? questions = this.questionsCreator(selectedCategory)
        : questions = null;
        console.log(selectedCategory);
        return(
            <div className={styles.Question}>
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