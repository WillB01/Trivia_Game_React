import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as categoriesAction from '../../store/actions/index';
import styles from './Categories.module.css';
import {NavLink} from 'react-router-dom';

class Categories extends Component {
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
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        ctg: state.categories,
        selectedCtg: state.sel
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCategoryHandler: (id) => dispatch(categoriesAction.fetchSelectedCategory(id))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);



