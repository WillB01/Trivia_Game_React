import React, { Component } from 'react';
import {connect} from 'react-redux';
import styles from './PlayerInfo.module.css';

class PlayerInfo extends Component {
    render() {
        return(
            <div className={styles.PlayerInfoContainer}>
                <div className={`${styles.Stats} bounce `}>
                    <div className={styles.Box}><h3>{this.props.triviaMain.name}</h3></div>
                        <div className={styles.Box}>
                            Completed: {this.props.triviaMain.score.total} <br></br> 
                            Points: {this.props.triviaMain.score.completedQuestionsBonus}
                        </div>
                    {this.props.hasRank ? <h3 className={styles.Box}>{this.props.triviaMain.rank}</h3> : null}
                </div>
            </div>
        );
    };

};

const mapStateToProps = (state) => {
    return {
        triviaMain: state.triviaMain.player,
        selectedCategory: state.selectedCategory.selectedCategory,
        hasRank: state.triviaMain.player.hasRank

    };
};

export default connect(mapStateToProps)(PlayerInfo);


