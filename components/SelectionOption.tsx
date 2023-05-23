import React from 'react';
import styles from '../styles/index.module.css';
import { Option } from '../utils/constants';
import Image from 'next/image';
import ServantImage from './ServantImage';

interface SelectionOptionProps {
  option: Option;
}

const SelectionOption = ({ option }: SelectionOptionProps) => {
  return (
    <div className={`${styles.selection}`}>
      <ServantImage
        imageUrl={option.icon}
        alt={option.name}
      />
      <span>{option.name}</span>
    </div>
  );
};

export default SelectionOption;