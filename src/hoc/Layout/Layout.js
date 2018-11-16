import React, {Component} from 'react'
import NavBar from '../../containers/Navbar/Navbar';
import HighScoreContainer from '../../containers/HighScore/HighScore';
import styles from './Layout.module.css';
import {connect} from 'react-redux';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
            <div className={styles.Layout}>
                {this.props.isAuthenticated ? 
                    <NavBar className={styles.Navbar} 
                            isAuthenticated={this.props.isAuthenticated} 
                            startGame={this.props.startGame} /> : null }
                             {!this.props.sctg.selectedCategory && this.props.isAuthenticated ?
                    <div className={styles.HighScoreContainer}>
                        <HighScoreContainer/> </div> : null }
                        </div>
                <main className={styles.Main} style={this.props.sctg.selectedCategory ? {margin : '0px auto'} : {margin : '100px auto'}}>
                    {this.props.children}
                
                </main>
         
            </React.Fragment>   

        )
    };
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        sctg: state.selectedCategory,
        startGame: state.triviaMain.startGame
    };
};

export default connect(mapStateToProps)(Layout);
