import { ChangeEvent } from "react";
import RegionRadio from './Region';
import { Region } from '../utils/constants'

interface RegionSelectionProps {
  selectedValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RegionSelection = ({ selectedValue, onChange }: RegionSelectionProps) => {
  return (
    <div>
      <RegionRadio
        selectedValue={selectedValue}
        onChange={onChange}
        label={Region.JP}
      />
      <RegionRadio
        selectedValue={selectedValue}
        onChange={onChange}
        label={Region.NA}
      />
    </div>
  );
};

export default RegionSelection;