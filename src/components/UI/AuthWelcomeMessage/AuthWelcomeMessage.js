import React from 'react';
import styles from './AuthWelcomeMessage.module.css';

const authWelcomeMessage = (props) => {
    return(
        <div className={styles.AuthWelcomeMessageContainer}>
            <h1>
            <span className={styles.title}>Trivia Quiz</span>
            {/* <span className={styles.title}> New Player</span> */}
            {/* <span className={styles.title}>a long</span>
            <span className={styles.title}>long title</span> */}
            </h1>
        </div>
    );
};

export default authWelcomeMessage