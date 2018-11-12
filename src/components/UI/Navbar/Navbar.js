import React, {Component} from 'react'

import styles from './Navbar.module.css';
import Ribbon from '../Ribbon/Ribbon';
import PlayerInfo from '../PlayerInfo/PlayerInfo';
import {FaAlignJustify} from 'react-icons/fa';
import SlideInMenu from '../SlideInMenu/SlideInMenu';


class Navbar extends Component {
    state = {
        showSlideIn: false
    };
    clickHandler = () => (this.setState((prevState) => ({showSlideIn: !prevState.showSlideIn})));
    render() {
        return (
            <nav className={styles.Navbar}>
            <div className={styles.Logo}>
                <Ribbon />
            </div>
           
        <div className={styles.NavbarItems}>
            <div className={styles.NavItem} onClick={this.clickHandler}><FaAlignJustify className={styles.FaBomb} /></div>
            {this.state.showSlideIn ? <SlideInMenu click={this.clickHandler} isAuthenticated={this.props.isAuthenticated } /> : null }
        </div>
            <PlayerInfo />
        </nav>
        )
    };
};


export default Navbar;