import React, { Component } from 'react';
import {connect} from 'react-redux';
import Categories from '../Categories/Categories';
import * as actions from '../../store/actions/index';
import PlayerInfo from '../../components/UI/PlayerInfo/PlayerInfo';

class TriviaMain extends Component {
    componentDidMount() {
        this.props.onInitCategories();
    };
    render() {
        return (
            <React.Fragment>
                <h1>Welcome</h1>
              
                <Categories />   
               
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
        onInitCategories: () => dispatch(actions.fetchCategories()), //Gets the data from api
        onResetGame: () => dispatch(actions.resetGame())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaMain);