import React, { Component } from 'react';
import {connect} from 'react-redux';
import styles from './PlayerInfo.module.css';

class PlayerInfo extends Component {
    state = {
        
    }
    render() {
        return(
            <div className={styles.PlayerInfoContainer}>
                <div className={`${styles.Stats} bounce `}>
                    <div className={styles.Box}>
                        <h3>{this.props.triviaMain.name}</h3>
                    </div>
                    {this.props.hasRank ? 
                    <div className={styles.Box}>  
                        <h3>{this.props.triviaMain.rank}</h3> 
                    </div> : null}
                  
                    <div className={styles.Box}>
                        <h3> Completed: {this.props.triviaMain.score.total} </h3>
                    </div>
                    <div className={styles.Box}>
                        <h3>Points: {this.props.triviaMain.score.completedQuestionsBonus}</h3>   
                    </div>
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


