import React, { Component } from 'react';
import {connect} from 'react-redux';

class TriviaMain extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>Hej</h1>
            </React.Fragment>         
        );
    };
};

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps, mapDispatchToProps,(TriviaMain));