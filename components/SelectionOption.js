import React from 'react';
import styles from '../styles/index.module.css';

const SelectionOption = ({ option }) => {
    return (
        <div className={`${styles.selection}`}>
            <img className={`${styles.servantIcon} ${styles.servantIconSelection}`} src={option.icon} alt="Icon" />
            <span>{option.name}</span>
        </div>
    );
};

export default SelectionOption;