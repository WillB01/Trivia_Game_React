import React, {Component} from 'react'
import {connect} from 'react-redux';


class ProgressBar extends Component {
    state = {
        correct: false
    };
   
    render() {
        
        const isCorrect = this.props.playerAnswer === this.props.correctAnswer ? true : false;
        console.log(this.props.start);
        let background = 'white'
        if (this.props.start) {
            console.log(this.props.playerAnswer);
            background = this.props.progressBar && isCorrect ? '#018E5B' : 'white' || this.props.playerAnswer !== '' || !isCorrect ? 'red': 'white';

        }
        
        const progressBar = {
        background,
        height: '30px',
        width: `${this.props.progressBar}%`
        };
       
    
    return(<div style={progressBar}></div>);

    };
}
    


const mapStateToProps = state => {
    return {
        selectedCtg: state.selectedCategory.selectedCategory,
        triviaMainIsCorrect: state.triviaMain.isCorrect,
        triviaMainStartGame: state.triviaMain.startGame,
        cards: state.selectedCategory.amountOfCards,
        progressBar: state.selectedCategory.progressBar
    };
};

export default connect(mapStateToProps)(ProgressBar);