import React from 'react';
import styles from '../styles/index.module.css';
import { Option } from '../utils/constants';

interface SelectionOptionProps {
  option: Option;
}

const SelectionOption = ({ option }: SelectionOptionProps) => {
  return (
    <div className={`${styles.selection}`}>
      <img
        className={`${styles.servantIcon} ${styles.servantIconSelection}`}
        src={option.icon}
        alt="Icon"
      />
      <span>{option.name}</span>
    </div>
  );
};

export default SelectionOption;