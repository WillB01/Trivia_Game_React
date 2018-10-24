import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as categoriesAction from '../../store/actions/index';

class Categories extends Component {
    render() {
        return(
            <div>
                <button onClick={this.props.onInitCategories}></button>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        categories: state.categories.categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitCategories: () => dispatch(categoriesAction.initIngredients())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);



