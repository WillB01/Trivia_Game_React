import React, {Component} from 'react'
import NavBar from '../../components/UI/Navbar/Navbar';
import HighScoreContainer from '../../containers/HighScore/HighScore';
import styles from './Layout.module.css';
import {connect} from 'react-redux';
import Instructions from '../../components/UI/Instructions/Instructions';


class Layout extends Component {

    render() {
        console.log(this.props.life)

        return (
            <React.Fragment>
            <div className={this.props.life === 1 ? `${styles.Last} 'slideInDown'` : styles.Layout}>
                {this.props.isAuthenticated ? <NavBar className={styles.Navbar} isAuthenticated={this.props.isAuthenticated} /> : null }
                {/* <Instructions /> */}
                {!this.props.sctg.selectedCategory && this.props.isAuthenticated ?<div className={styles.HighScoreContainer}><HighScoreContainer/> </div> : null }

                <main className={styles.Main}>
                    <div className={styles.Children}>{this.props.children}</div>
                </main>
            </div>
            </React.Fragment>   

        )
    };
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        sctg: state.selectedCategory,
        life: state.triviaMain.life,
        
    };
};

export default connect(mapStateToProps)(Layout);
