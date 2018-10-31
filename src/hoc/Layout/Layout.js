import React, {Component} from 'react'
import NavBar from '../../components/UI/Navbar/Navbar';
import PlayerInfo from '../../components/UI/PlayerInfo/PlayerInfo';
import styles from './Layout.module.css';
import {connect} from 'react-redux';

class Layout extends Component {
    render() {
    console.log(this.props.isAuthenticated);

        return (
            
            <div className={styles.Layout}>
                <NavBar className={styles.Navbar}
                        isAuthenticated={this.props.isAuthenticated} />
                {this.props.isAuthenticated ? <PlayerInfo className={styles.PlayerInfo} /> : null}
              
                <main className={styles.Main}>
                {/* <div className={styles.Header} >HEADER</div> */}
                    {this.props.children}
                </main>
            </div>

        )
    };
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);
