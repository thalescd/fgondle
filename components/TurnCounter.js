import React from 'react';
import styles from '../styles/index.module.css';

function TurnCounter({ turn, limitTurns }) {
  return (
    <h3 className={styles.turns}>Turn {turn}/{limitTurns}</h3>
  );
}

export default TurnCounter;