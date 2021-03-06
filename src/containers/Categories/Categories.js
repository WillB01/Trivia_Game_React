import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as categoriesAction from '../../store/actions/index';
import styles from './Categories.module.css';
import {NavLink, Redirect} from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import {Events, animateScroll as scroll} from 'react-scroll'
import {FaPlus, FaMinus, FaStar} from 'react-icons/fa';

class Categories extends Component {
     componentDidMount() {
        this.props.onResetGame();
        Events.scrollEvent.register('begin');
        Events.scrollEvent.register('end');
    };

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');   
    };

    pageignationHandler = (btnClick) => { 
        this.props.fetchCategories(btnClick, this.props.ctg.categories);
        if (btnClick === 'more' ) {
            scroll.scrollToBottom({ 
                delay: 200,  
                smooth: 'easeInOutQuart'});
        }
    }; // show more or less categories

    giveCompletedCategoryCssClass = (completed, ctg) => {
        if (!completed) {return [];}
        if (ctg) {return ctg.map(item => (completed.filter(id => id === item.id)))}
    }; // checks if player has any category ids. if true returns only completed ids


    render() {
        let categories = < Spinner /> ;
        const completed = this.props.triviaMain.player.score.selectedCategoryCompletedId;
        const ctg =  this.props.ctg.categories;
        const completedCtg = this.giveCompletedCategoryCssClass(completed, ctg);
        
        ctg 
        ? categories = (
            ctg.map((item, index) => ( 
                completedCtg[index].length !== 0 || completedCtg[index].length === 'undefined'  ? <div key={item.id} className={ styles.CategoriesCompleted }>
                    <div className={styles.Start}><FaStar /></div> {item.title}</div> : 
                <NavLink to={{
                    pathname: '/selected-category',
                    search: `?id=${item.id}`,
                    state: {id: item.id}
                }} className={styles.CategoriesItems } 
                   key={item.id}
                   onClick={() => this.props.onCategoryHandler(item.id, this.props.ctg)}>{item.title}
                </NavLink>
                
            ))
        ) 
        : categories = < Spinner /> ;
    
        return(
            <React.Fragment>
                {!this.props.isAuthenticated ? <Redirect to="/" /> : null }
                <div className={styles.Categories}>
                <div className={styles.Pagination}>
                    <Button click={() => this.pageignationHandler('less')}
                            btnType={'Pagination'}><FaMinus /></Button>
                    <Button click={() => this.pageignationHandler('more')}
                            btnType={'Pagination'}><FaPlus /></Button>
                </div>
                    {categories}
                </div>
            </React.Fragment>
          
        );
    };
};

const mapStateToProps = state => {
    return {
        ctg: state.categories,
        selectedCtg: state.selectedCategory,
        isAuthenticated: state.auth.token !== null,
        triviaMain: state.triviaMain  
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCategoryHandler: (id, ctg) => dispatch(categoriesAction.fetchSelectedCategory(id, ctg)),
        fetchCategories: (btnClick) => dispatch(categoriesAction.fetchCategories(btnClick)),
        onResetGame: () => dispatch(categoriesAction.resetGame()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);



