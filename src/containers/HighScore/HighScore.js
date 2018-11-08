import React, { Component } from 'react'
import styles from './HighScore.module.css';
import * as k from '../../k';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class HighScore extends Component {
    state = {
        showHighScore: true
    }
    componentDidMount() {
      console.log(this.props.highscore);
    }

    showHighScore = () => {
        this.setState(prevState => ({showHighScore: !prevState.showHighScore}));
    };

    highscoreJsx = (highscore) => {
        let highscoreArray = [];
        for (const key in highscore) {
            highscoreArray.push({name: highscore[key].name, completedQuestionsBonus: highscore[key].score.completedQuestionsBonus});
           }
          return highscoreArray.map((item, index) => (
              <div>
          <p key={index}>{index + 1} : {item.name} {item.completedQuestionsBonus}</p> 
            </div>
          ));
    }

   render() {
        const printHighscore = this.props.highscore ? this.highscoreJsx(this.props.highscore) : <Spinner />;
    return(
        <div className={styles.HighScoreContainer}>
            <div className={styles.Header} onClick={this.showHighScore}>Top Playes</div>
            {this.state.showHighScore ? printHighscore : null}
        </div>
    )
   };
};

const mapStateToProps = (state) => {
    return {
        highscore : state.highscore.highscore
    };
};

export default connect(mapStateToProps)(HighScore);