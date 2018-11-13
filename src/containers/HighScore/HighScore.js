import React, { Component } from 'react'
import styles from './HighScore.module.css';
import * as k from '../../k';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {FaTrophy} from 'react-icons/fa';

class HighScore extends Component {
    state = {
        showHighScore: false,
        showPlayerScore: false
    }

    showHighScore = (btn) => {
        btn === 'player' 
        ? this.setState(prevState => ({showPlayerScore: !prevState.showPlayerScore})) 
        : this.setState(prevState => ({showHighScore: !prevState.showHighScore}));
        
    };

    highscoreJsx = (highscore) => {
        let highscoreArray = [];
        for (const key in highscore) {
            highscoreArray.push({name: highscore[key].name, completedQuestionsBonus: highscore[key].score.completedQuestionsBonus});
           }
          return highscoreArray.map((item, index) => (
              <div key={index}>
          <p>{index + 1} : {item.name} {item.completedQuestionsBonus}</p> 
            </div>
          ));
    }

   render() {
        const printHighscore = this.props.highscore ? this.highscoreJsx(this.props.highscore) : <Spinner />;
    return(
        <React.Fragment>
        {/* <div className={styles.ScoreContainer}> */}
            <div className={styles.HighScoreContainer}>
                <div className={styles.Header} onClick={() => this.showHighScore('highscore')}>
                    Top 10 World Players 
                    <div className={styles.Trophy}>
                        <FaTrophy /></div>
                    </div>
                {this.state.showHighScore ? printHighscore : null}
             {/* </div> */}
        {/* <div className={styles.HighScoreContainer}>
                <div className={styles.Header} onClick={() => this.showHighScore('player')}>Your Score</div>
                {this.state.showPlayerScore ? printHighscore : null}
                </div> */}
        </div>
        </React.Fragment>
    )
   };
};

const mapStateToProps = (state) => {
    return {
        highscore : state.highscore.highscore
    };
};

export default connect(mapStateToProps)(HighScore);