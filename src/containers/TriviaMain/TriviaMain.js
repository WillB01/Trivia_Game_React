import React, { Component } from 'react';
import {connect} from 'react-redux';
import PossibleAnswers from '../../components/PossibleAnswers/PossibleAnswers';
import Categories from '../Categories/Categories';
import Questions from '../Questions/Questions';
import * as actions from '../../store/actions/index';
import SelectedCategory from '../../components/SelectedCategory/SelectedCategory';

class TriviaMain extends Component {
    componentDidMount() {
        this.props.onInitCategories();
    };
    render() {
        return (
            <React.Fragment>
                <h1>Welcome</h1>
                <Categories isCorrect={this.props.triviaMainIsCorrect} />   
            </React.Fragment>         
        );
    };
};

const mapStateToProps = state => {
    return {
        ctg: state.categories,
      
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitCategories: () => dispatch(actions.fetchCategories()) //Gets the data from api
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaMain);