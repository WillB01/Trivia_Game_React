import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as categoriesAction from '../../store/actions/index';

class Categories extends Component {

    render() {
        let categories = null;
        let ctg =  this.props.ctg.categories;
        ctg 
        ? categories = (
            ctg.map(item => (
                <p key={item.id}>{item.title}</p>
            ))
        ) 
        : categories = <div>loading</div> ;
        console.log(this.props.ctg.categories);
        return(
            <div>
              {categories}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        ctg: state.categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitCategories: () => dispatch(categoriesAction.fetchCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);



