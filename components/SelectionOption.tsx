import { Option } from '../utils/constants';
import ServantImage from './ServantImage';

interface SelectionOptionProps {
  option: Option;
}

const SelectionOption = ({ option }: SelectionOptionProps) => {
  return (
    <div className='flex items-center'>
      <ServantImage
        imageUrl={option.icon}
        alt={option.name}
      />
      <span className='ml-4 text-2xl'>{option.name}</span>
    </div>
  );
};

export default SelectionOption;