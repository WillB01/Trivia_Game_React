import React, {Component} from 'react'
import NavBar from '../../components/UI/Navbar/Navbar';
import HighScoreContainer from '../../containers/HighScore/HighScore';
import styles from './Layout.module.css';
import {connect} from 'react-redux';


class Layout extends Component {

    render() {
        return (
            <React.Fragment>
            <div className={styles.Layout}>
                {this.props.isAuthenticated ? <NavBar className={styles.Navbar} isAuthenticated={this.props.isAuthenticated} /> : null }
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
    };
};

export default connect(mapStateToProps)(Layout);
