import React, { Component } from 'react';
import {connect} from 'react-redux';
import Categories from '../Categories/Categories';
import * as actions from '../../store/actions/index'
import axios from 'axios';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class TriviaMain extends Component {
    componentDidMount() {
        this.props.onInitPatchdDb(this.props.triviaMain);
        this.props.onInitCategories();
        this.props.onInitHighScore();
        this.props.onResetGame();
        this.props.onResetSelectCategory();
    };

    render() {
        return (
            <React.Fragment>
                <Categories /> 
            </React.Fragment>         
        );
    };
};

const mapStateToProps = state => {
    return {
        triviaMain: state.triviaMain
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitCategories: () => dispatch(actions.fetchCategories()), //Gets the categories data from api,
        onResetGame: () => dispatch(actions.resetGame()),
        onResetSelectCategory: () => (dispatch(actions.resetSelectCategory())),
        onInitPatchdDb: (triviaMain) => dispatch(actions.initPatchdDb(triviaMain)),
        onInitHighScore: () => dispatch(actions.fetchHighScore())       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(TriviaMain,axios));