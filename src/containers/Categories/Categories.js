import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as categoriesAction from '../../store/actions/index';
import styles from './Categories.module.css';
import {NavLink} from 'react-router-dom';
import SelectedCategory from '../../components/SelectedCategory/SelectedCategory';

class Categories extends Component {
    state = {
        pageCounter: 0
    };
    pageignationHandler = (e) => { //TODOOOOOO
        this.props.fetchCategories(e.target.name);
    };

    giveCompletedCategoryCssClass = (completed, ctg) => {
        if (!completed) {
            return [];
        }
        if (ctg) {
            return ctg.map(item => {
                return completed.filter(id => id === item.id);
            })

        }
        
    };
    
    render() {
        let categories = null;
        const completed = this.props.selectedCtg.selectedCategoryCompletedId;
        const ctg =  this.props.ctg.categories;
        const test = this.giveCompletedCategoryCssClass(completed, ctg);

        ctg 
        ? categories = (
            ctg.map((item, index) => (
               
                <NavLink to={{
                    pathname: '/selected-category',
                    search: `?id=${item.id}`,
                    state: {id: item.id}
                }} className={test[index].length !== 0 ? styles.CategoriesCompleted : styles.CategoriesItems } 
                   key={item.id}
                   onClick={() => this.props.onCategoryHandler(item.id)}>{item.title}
                   {/* <div>{this.props.selectedCtg.selectedCategoryCompletedId[index]} {index}</div> */}
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
        selectedCtg: state.selectedCategory,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCategoryHandler: (id) => dispatch(categoriesAction.fetchSelectedCategory(id)),
        fetchCategories: (num) => dispatch(categoriesAction.fetchCategories(num))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);



