import React from 'react';
import styles from './InformationCard.module.css';

const informationCard = (props) => {
    return(
        <div className={styles.InformationCardContainer}>
           <h1>Welcome to the worlds leading Trivia Quiz Game!</h1>
           <h4>Dive in to thousands of categories, and share your score with friends!</h4>
           <em>"You will never be the same" // Christopher Langan</em>
        </div>
    )
};

export default informationCard;