import React, { Component } from 'react';
import {connect} from 'react-redux';
import Categories from '../Categories/Categories';
import * as actions from '../../store/actions/index'
import styles from './TriviaMain.module.css';
import axios from 'axios';

class TriviaMain extends Component {
    state = {
        completedCategories: []
    };
    componentDidMount() {
        this.props.onInitCategories();
        this.props.onResetGame();
        this.props.onResetSelectCategory();
        // this.img();
        
    };


    // img = () => {
    //     axios.get('https://picsum.photos/200/300/?random')
    //     .then(res => {
    //        console.log(res);
    //     })
    //     .catch(error => {
    //         console.log(error);
        
    //     })
    // };

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
        onResetSelectCategory: () => (dispatch(actions.resetSelectCategory()))
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaMain);