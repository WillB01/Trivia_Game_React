import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as categoriesAction from '../../store/actions/index';
import styles from './Categories.module.css';

class Categories extends Component {
    render() {
        let categories = null;
        let ctg =  this.props.ctg.categories;
        ctg 
        ? categories = (
            ctg.map(item => (
                <p className={styles.CategoriesItems} 
                   key={item.id}
                   onClick={() => this.props.onCategoryHandler(item.id)}>{item.title}</p>
            ))
        ) 
        : categories = <div>loading</div> ;
        return(
            <div className={styles.Categories}>
              {categories}
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



