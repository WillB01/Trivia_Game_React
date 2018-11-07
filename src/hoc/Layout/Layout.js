import React, {Component} from 'react'
import NavBar from '../../components/UI/Navbar/Navbar';
import PlayerInfo from '../../components/UI/PlayerInfo/PlayerInfo';
import styles from './Layout.module.css';
import {connect} from 'react-redux';


class Layout extends Component {
    render() {

        return (
            <React.Fragment>
            <div className={styles.Layout}>
                {this.props.isAuthenticated ? <NavBar className={styles.Navbar} isAuthenticated={this.props.isAuthenticated} /> : null }
               
               
                
                <main className={styles.Main}>
                {/* <div className={styles.Banner} >Banner</div> */}
                {/* {this.props.isAuthenticated ? <PlayerInfo className={styles.PlayerInfo} /> : null} */}
                    {this.props.children}
                </main>
            </div>
            </React.Fragment>   

        )
    };
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);
