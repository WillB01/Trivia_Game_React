import React, { Component } from 'react';
import {connect} from 'react-redux';

class PlayerInfo extends Component {
    render() {
        return(
            <div>
                <h3>name: {this.props.triviaMain.name}</h3>
                <h3>completed categories: {this.props.triviaMain.score.total} </h3>
                {this.props.cards ? <h3>score selected category: {`${this.props.triviaMain.score.selectedCategory} / ${this.props.cards.length}`}</h3> : null}
            </div>
        );
    };

};

const mapStateToProps = (state) => {
    return {
        triviaMain: state.triviaMain.player,
        selectedCategory: state.selectedCategory.selectedCategory,
        cards: state.selectedCategory.selectedCategory
    };
};

export default connect(mapStateToProps)(PlayerInfo);


