import React, { Component } from 'react';
import {connect} from 'react-redux';
import Categories from '../Categories/Categories';
import * as actions from '../../store/actions/index'
import {Redirect} from 'react-router-dom';

class TriviaMain extends Component {
    state = {
        completedCategories: []
    };
    componentDidMount() {
        this.props.onTryAutoSignup();
        this.props.onInitCategories();
        this.props.onResetGame();
        this.props.onResetSelectCategory();
        if (this.props.selectedCtg.selectedCategoryCompleted) {
            this.props.completedCategory(); // something is making this VERY VERY SLOOOOW
        }  
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
        ctg: state.categories,
        selectedCtg: state.selectedCategory,
        isAuthenticated: state.auth.token !== null
      
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitCategories: () => dispatch(actions.fetchCategories()), //Gets the data from api
        onResetGame: () => dispatch(actions.resetGame()),
        onResetSelectCategory: () => (dispatch(actions.resetSelectCategory())),
        completedCategory: () => dispatch(actions.completedCategory()),
        onTryAutoSignup: () => dispatch(actions.authCheckState())
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaMain);