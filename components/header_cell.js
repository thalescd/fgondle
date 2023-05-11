import React from 'react';
import styles from '../styles/index.module.css';

const HeaderCell = ({ label }) => {
    return (
        <th className={`${styles.cell} ${styles.headerCell}`}>{label}</th>
    );
};

export default HeaderCell;