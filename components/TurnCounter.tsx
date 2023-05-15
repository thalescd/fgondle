import React from 'react';
import styles from '../styles/index.module.css';

interface TurnCounterProps {
  turn: number;
  limitTurns: number;
}

function TurnCounter({ turn, limitTurns }: TurnCounterProps) {
  return (
    <h3 className={styles.turns}>Turn {turn}/{limitTurns}</h3>
  );
}

export default TurnCounter;