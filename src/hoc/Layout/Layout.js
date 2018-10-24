import React, {Component} from 'react'
import NavBar from '../../components/UI/Navbar';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <main>
                    {this.props.children}
                </main>
            </React.Fragment>

        )
    };
};

export default Layout;
