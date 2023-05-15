import React, { MouseEventHandler } from 'react';
import styles from '../styles/index.module.css';

interface ResetButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ResetButton = ({ onClick }: ResetButtonProps) => {
  return (
    <button
      className={styles.btn}
      onClick={onClick}
    >Play again</button>
  );
};

export default ResetButton;