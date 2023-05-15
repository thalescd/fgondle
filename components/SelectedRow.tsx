import React from 'react';
import styles from '../styles/index.module.css';
import { Servant } from '../utils/interfaces/servants.interface';

interface SelectedTableProps {
    servant: Servant;
    checkGuess: () => boolean;
}

const SelectedRow = ({ servant, checkGuess }) => {
    return <tr key={servant.id}>
        <td className={`${styles.cell} ${styles.iconCell}`}>
            <img
                className={`${styles.servantIcon} ${styles.servantIconCell}`}
                src={servant.icon}
                alt={servant.name}
            />
        </td>
        {Object.keys(servant).map((key) => {
            if (key === 'id' || key === 'icon') {
                return null;
            }
            return <td
                className={`${checkGuess(key, servant[key]) ? styles.right : styles.wrong} ${styles.cell}`}
                key={key}>{servant[key]}
            </td>;
        })}
    </tr>;
};

export default SelectedRow;