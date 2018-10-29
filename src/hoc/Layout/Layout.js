import React, {Component} from 'react'
import NavBar from '../../components/UI/Navbar/Navbar';
import PlayerInfo from '../../components/UI/PlayerInfo/PlayerInfo';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <PlayerInfo />
                
                <main>
                    {this.props.children}
                </main>
            </React.Fragment>

        )
    };
};

export default Layout;
