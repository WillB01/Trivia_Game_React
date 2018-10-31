import React, { Component } from 'react';
import {connect} from 'react-redux';
import styles from './PlayerInfo.module.css';

class PlayerInfo extends Component {
    render() {
        return(
            <div className={styles.PlayerInfoContainer}>
                <div className={`${styles.Stats} bounce `}>
                    <div className={styles.Box}>{this.props.triviaMain.name}</div>
                        <div className={styles.Box}>
                            Completed: {this.props.triviaMain.score.total} <br></br> 
                            Points: {this.props.triviaMain.score.completedQuestionsBonus}
                        </div>
                    {this.props.hasRank ? <h3 className={styles.Box}>{this.props.triviaMain.rank}</h3> : null}
                    {this.props.cards ? <h3 className={styles.Box}>{this.props.triviaMain.score.selectedCategory} </h3> : null}
                    {this.props.cards ? <h3 className={styles.Box}>{`${this.props.cardsLeft.length} / ${this.props.cards.length}`}</h3> : null}
                </div>
            </div>
        );
    };

};

const mapStateToProps = (state) => {
    return {
        triviaMain: state.triviaMain.player,
        selectedCategory: state.selectedCategory.selectedCategory,
        cards: state.selectedCategory.selectedCategory,
        cardsLeft: state.selectedCategory.amountOfCardsPlayed,
        hasRank: state.triviaMain.player.hasRank

    };
};

export default connect(mapStateToProps)(PlayerInfo);


