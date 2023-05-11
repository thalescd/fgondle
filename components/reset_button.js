import React from 'react';
import styles from '../styles/index.module.css';

const ResetButton = ({ onClick }) => {
    return (
        <button
            className={styles.btn}
            onClick={onClick}
        >Play again</button>
    );
};

export default ResetButton;