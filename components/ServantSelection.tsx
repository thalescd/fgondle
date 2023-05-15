import React from 'react';
import Select from 'react-select';
import { Servant, Option } from '../utils/constants';
import SelectionOption from './SelectionOption';

interface ServantSelectionProps {
    servants: Servant[];
    selectedServant: Servant | null;
    handleServantSelection: (selected: Servant | null) => void;
}

const ServantSelection = ({
    servants,
    selectedServant,
    handleServantSelection,
}: ServantSelectionProps) => {

    const formatOptionLabel = ({ name, icon }: Option): JSX.Element => (
        <SelectionOption option={{ name, icon }} />
    );

    return (
        <Select
            placeholder="Select a servant..."
            options={servants}
            getOptionLabel={(servant: Servant) => servant.name}
            getOptionValue={(servan: Servant) => servan.id.toString()}
            formatOptionLabel={formatOptionLabel}
            onChange={handleServantSelection}
            value={selectedServant}
        />
    );
};

export default ServantSelection;
