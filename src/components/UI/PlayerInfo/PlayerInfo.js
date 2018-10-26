import React, { Component } from 'react';
import {connect} from 'react-redux';

class PlayerInfo extends Component {
    render() {
    console.log(this.props.triviaMain.name)

        return(
            <div>
                <h3>name: {this.props.triviaMain.name}</h3>
                <h3>completed categories: {this.props.triviaMain.score.total} </h3>
                <h3>score selected category: {this.props.triviaMain.score.selectedCategory}</h3>
            </div>
        );
    };

};

const mapStateToProps = (state) => {
    return {
        triviaMain: state.triviaMain.player
    };
};

export default connect(mapStateToProps)(PlayerInfo);


