import React, {Component} from 'react'
import NavBar from '../../components/UI/Navbar/Navbar';
import PlayerInfo from '../../components/UI/PlayerInfo/PlayerInfo';
import styles from './Layout.module.css';

class Layout extends Component {
    render() {
        return (
            <div className={styles.Layout}>
                <NavBar className={styles.Navbar} />
                <PlayerInfo className={styles.PlayerInfo} />
              
                <main className={styles.Main}>
                {/* <div className={styles.Header} >HEADER</div> */}
                
                
                    {this.props.children}
                </main>
            </div>

        )
    };
};

export default Layout;
