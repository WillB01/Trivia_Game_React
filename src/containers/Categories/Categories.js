import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as categoriesAction from '../../store/actions/index';
import styles from './Categories.module.css';
import {NavLink} from 'react-router-dom';

class Categories extends Component {
    state = {
        pageCounter: 0
    };
    pageignationHandler = (e) => { //TODOOOOOO
        this.props.fetchCategories(e.target.name);
    };
    render() {
        let categories = null;
        let ctg =  this.props.ctg.categories;
        ctg 
        ? categories = (
            ctg.map(item => (
                <NavLink to="/selected-category" className={styles.CategoriesItems} 
                   key={item.id}
                   onClick={() => this.props.onCategoryHandler(item.id)}>{item.title}
                </NavLink>
            ))
        ) 
        : categories = <div>loading</div> ;
        return(
            <div className={styles.Categories}>
              {this.props.ctg.categories ? categories : null}
              <button name="less" 
                      onClick={this.pageignationHandler}>-</button>
              <button name="more"
                      onClick={this.pageignationHandler}>+</button>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        ctg: state.categories,
        selectedCtg: state.sel,
        triviaMainIsCorrect: state.triviaMain.isCorrect
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCategoryHandler: (id) => dispatch(categoriesAction.fetchSelectedCategory(id)),
        fetchCategories: (num) => dispatch(categoriesAction.fetchCategories(num))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);



