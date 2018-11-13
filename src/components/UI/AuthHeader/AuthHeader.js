import React from 'react';
import styles from './AuthHeader.module.css';

const authHeader = (props) => {
    return(
        <div className={styles.AuthHeader}>
            <h1>
                <span className={styles.title}>Trivia Quiz</span>
            </h1>
        </div>
    );
};

export default authHeader