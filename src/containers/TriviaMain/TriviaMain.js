import React, { Component } from 'react';
import {connect} from 'react-redux';
import Categories from '../Categories/Categories';
import * as actions from '../../store/actions/index';
import PlayerInfo from '../../components/UI/PlayerInfo/PlayerInfo';

class TriviaMain extends Component {
    state = {
        completedCategories: []
    };
    componentDidMount() {
        this.props.onInitCategories();
        this.props.onResetGame();
    };

    // checkIfCategorieHasCompleted = (categories) => {
    //     let cat = [];
    //     if (categories) {
    //         categories.forEach(element => {
    //             if (element.id === this.props.selectedCtg.selectedCategoryCompletedId) 
    //                cat.push(element.id);
    //         });
            
    //     };

    //     return cat;
       
    // };

    render() {
        // let ctg = this.props.ctg.categories;
        // if(ctg) {
        //   this.checkIfCategorieHasCompleted(ctg);
   
        // }
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
        selectedCtg: state.selectedCategory,
      
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitCategories: () => dispatch(actions.fetchCategories()), //Gets the data from api
        onResetGame: () => dispatch(actions.resetGame()),
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaMain);