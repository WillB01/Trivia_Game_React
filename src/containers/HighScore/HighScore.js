import React, { Component } from 'react'
import styles from './HighScore.module.css';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {FaTrophy} from 'react-icons/fa';
import _ from 'lodash';

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
            highscoreArray.push({
                name: highscore[key].name, 
                completedQuestionsBonus: highscore[key].score.completedQuestionsBonus,
                total:highscore[key].score.total});
           }
        const ordered = _.orderBy(highscoreArray,['completedQuestionsBonus'],['desc']);
          return ordered.map((item, index) => (
              <div className={styles.Score} key={index}>
                <p>{index + 1} - {item.name}: Score {item.completedQuestionsBonus} Total: {item.total}</p> 
              </div>
          ));
    };

   render() {
        const printHighscore = this.props.highscore ? this.highscoreJsx(this.props.highscore) : <Spinner />;
    return(
        <React.Fragment>
            <div className={`${styles.HighScoreContainer} slideInDown`}>
                <div className={styles.Header} onClick={() => this.showHighScore('highscore')}>
                    Top 10 World Players 
                    <div className={styles.Trophy}>
                        <FaTrophy />
                    </div>
                </div>
                {this.state.showHighScore ? printHighscore : null}
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