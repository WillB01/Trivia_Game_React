import React, { Component } from 'react';
import {connect} from 'react-redux';
import styles from './PlayerInfo.module.css';

class PlayerInfo extends Component {
    state = {
        showContent: false
    }

    handleClick = () => this.setState(prevState => ({showContent: !prevState.showContent}));
    render() {
        const content = (
            <React.Fragment>
            {this.props.hasRank ? 
            <div className={styles.Box}>  
                {this.props.triviaMain.rank} 
            </div> : null}
          
            <div className={styles.Box}>
                Total: {this.props.triviaMain.score.total} 
            </div>
            <div className={styles.Box}>
                Points: {this.props.triviaMain.score.completedQuestionsBonus}
            </div>
            </React.Fragment>
            )
        return(
            <div className={styles.PlayerInfoContainer}>
                <div className={`${styles.Stats} bounce `}>
                    <div className={styles.Box}
                         onClick={this.handleClick}>
                        {this.props.triviaMain.name}
                    </div>
                    {this.state.showContent ? content : null}                   
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


