import React from 'react';
import styles from '../styles/index.module.css';

interface HeaderCellProps {
    label: string;
}

const HeaderCell = ({ label }: HeaderCellProps) => {
    return (
        <th className={`${styles.cell} ${styles.headerCell}`}>{label}</th>
    );
};

export default HeaderCell;