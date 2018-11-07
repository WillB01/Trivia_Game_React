import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as categoriesAction from '../../store/actions/index';
import styles from './Categories.module.css';
import {NavLink, Redirect} from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import {Events, animateScroll as scroll} from 'react-scroll'
import {FaPlus, FaMinus} from 'react-icons/fa';



class Categories extends Component {
     componentDidMount() {
        this.props.onResetGame();
        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });
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

//     List = ({ list }) =>
//   <div className="list">
//     {list.map(item => <div className="list-row" key={item.objectID}>
//       <a href={item.url}>{item.title}</a>
//     </div>)}
//   </div>
    
    render() {
        let categories = < Spinner /> ;
        const completed = this.props.triviaMain.player.score.selectedCategoryCompletedId;
        const ctg =  this.props.ctg.categories;
        const test = this.giveCompletedCategoryCssClass(completed, ctg);
        ctg 
        ? categories = (
            ctg.map((item, index) => (
               
                <NavLink to={{
                    pathname: '/selected-category',
                    search: `?id=${item.id}`,
                    state: {id: item.id}
                }} className={test[index].length !== 0 || test[index].length === 'undefined'  ? styles.CategoriesCompleted : styles.CategoriesItems } 
                //    style={test[index].length !== 0 || test[index].length === 'undefined' ? {background: '#018E5B'} : {background: '#'+(Math.random()*0xFFFFFF<<0).toString(10)}}
                   key={item.id}
                   onClick={() => this.props.onCategoryHandler(item.id)}>{item.title}
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
        onCategoryHandler: (id) => dispatch(categoriesAction.fetchSelectedCategory(id)),
        fetchCategories: (btnClick) => dispatch(categoriesAction.fetchCategories(btnClick)),
        onResetGame: () => dispatch(categoriesAction.resetGame()),
      
       
      
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);



