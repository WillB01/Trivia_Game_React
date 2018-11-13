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
        return (
            <nav className={styles.Navbar}>
              <PlayerInfo />
            <div className={styles.Logo}>
                <Ribbon />
            </div>
           
        <div className={styles.NavbarItems}>
            <div className={styles.NavItem} onClick={this.clickHandler}><FaAlignJustify className={styles.FaBomb} /></div>
            {this.state.showSlideIn ? <SlideInMenu click={this.clickHandler} isAuthenticated={this.props.isAuthenticated } /> : null }
            <Backdrop clicked={this.clickHandler} show={this.state.showSlideIn}  />
        </div>
          
        </nav>
        )
    };
};


export default Navbar;