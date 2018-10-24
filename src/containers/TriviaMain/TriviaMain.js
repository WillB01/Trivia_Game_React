import React, { Component } from 'react';
import {connect} from 'react-redux';
import PossibleAnswers from '../../components/PossibleAnswers/PossibleAnswers';
import Categories from '../Categories/Categories';

class TriviaMain extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>Welcome</h1>
                <Categories />              
                <PossibleAnswers />
            </React.Fragment>         
        );
    };
};

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaMain);