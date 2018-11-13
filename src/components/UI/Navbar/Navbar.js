import React, {Component} from 'react'
import styles from './Navbar.module.css';
import Ribbon from '../Ribbon/Ribbon';
import PlayerInfo from '../PlayerInfo/PlayerInfo';
import {FaAlignJustify} from 'react-icons/fa';
import SlideInMenu from '../SlideInMenu/SlideInMenu';
import Backdrop from '../Backdrop/Backdrop';

class Navbar extends Component {
    state = {
        showSlideIn: false
    };
    clickHandler = () => (this.setState((prevState) => ({showSlideIn: !prevState.showSlideIn})));
    render() {
        const menu = (  <div className={styles.NavbarItems}>
            <div className={styles.NavItem} 
                 onClick={this.clickHandler}>
                    <FaAlignJustify className={styles.FaBomb} />
            </div>
            {this.state.showSlideIn 
                ? <SlideInMenu click={this.clickHandler} 
                               isAuthenticated={this.props.isAuthenticated } /> : null }
            <Backdrop clicked={this.clickHandler} show={this.state.showSlideIn}  />
        </div>);

        const notOnStartGame = !this.props.startGame ? (
        <React.Fragment>
             <PlayerInfo />
             <div className={styles.Logo}>
                <Ribbon />
            </div>
          
        </React.Fragment>) : null;
        
        const onStartGame = this.props.startGame ? (
            <React.Fragment>
            <div className={styles.NavItem} 
                 onClick={this.clickHandler}>
                    <FaAlignJustify className={styles.FaBomb} />
            </div>
                {this.state.showSlideIn 
                ? <SlideInMenu click={this.clickHandler} 
                               isAuthenticated={this.props.isAuthenticated } /> : null }
            <Backdrop clicked={this.clickHandler} show={this.state.showSlideIn}  />
            </React.Fragment> 
        ) : null;

        return (
            <nav className={styles.Navbar} style={!this.props.startGame ? {background: ''} : {background: 'none', boxShadow : 'none'}}>
               {menu}
              {notOnStartGame}
            
              
              
          
        </nav>
        )
    };
};


export default Navbar;