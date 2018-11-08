import React, { Component } from 'react'
import styles from './HighScore.module.css';
import * as k from '../../k';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class HighScore extends Component {
    componentDidMount() {
      console.log(this.props.highscore);
    }

    highscoreJsx = (highscore) => {
        let highscoreArray = [];
        for (const key in highscore) {
            highscoreArray.push({name: highscore[key].name, completedQuestionsBonus: highscore[key].score.completedQuestionsBonus});
           }
          return highscoreArray.map(item => (<h2 key={item.name}>{item.name} {item.completedQuestionsBonus}</h2> ));
    }

   render() {
        const printHighscore = this.props.highscore ? this.highscoreJsx(this.props.highscore) : <Spinner />;
    return(
        <div className={styles.HighScoreContainer}>
            {printHighscore}
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