import React, {Component} from 'react'
import styles from './Navbar.module.css';
import Ribbon from '../../components/UI/Ribbon/Ribbon';
import PlayerInfo from '../../components/UI/PlayerInfo/PlayerInfo';
import {FaAlignJustify} from 'react-icons/fa';
import SlideInMenu from '../../components/UI/SlideInMenu/SlideInMenu';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import HealthBar from '../../components/UI/HealthBar/HealthBar';
import {connect} from 'react-redux';


class Navbar extends Component {
    state = {
        showSlideIn: false
    };
    
    clickHandler = () => (this.setState((prevState) => ({showSlideIn: !prevState.showSlideIn})));
    
    render() {
        const menu = (  
            <div className={styles.NavbarItems}>
                <div className={styles.NavItem} onClick={this.clickHandler}>
                    <FaAlignJustify className={styles.FaBomb} />
                </div>
                {this.state.showSlideIn ? <SlideInMenu click={this.clickHandler} isAuthenticated={this.props.isAuthenticated } /> : null }
                <Backdrop clicked={this.clickHandler} show={this.state.showSlideIn}  />
            </div>
        );

        const notOnStartGame = !this.props.startGame ? (
            <React.Fragment>
                <div className={styles.Logo}>
                    <Ribbon />
                </div>
                <div className={styles.PlayerInfo}>
                    <PlayerInfo />
                </div>
            </React.Fragment>
        ) : null; // shows when player has not pressed start
        
        const onStartGame = this.props.startGame ? (
            <React.Fragment>
                <div className={styles.NavItem} >
                    <HealthBar className={styles.GameScore} life={this.props.life}/>
                </div>
                <div className={styles.NavItem} >
                    <div className={styles.Score}>score: {this.props.score}</div>
                </div>
            </React.Fragment> 
        ) : null; // shows when player has pressed start

        return (
            <nav className={styles.Navbar} style={!this.props.startGame ? {background: ''} : {background: 'none', boxShadow : 'none'}}>
               {menu}
               {onStartGame}
               {notOnStartGame}
            </nav>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        sctg: state.selectedCategory,
        startGame: state.triviaMain.startGame,
        life: state.triviaMain.life,
        score: state.triviaMain.player.score.completedQuestionsBonus,
    };
};

export default connect(mapStateToProps)(Navbar);
