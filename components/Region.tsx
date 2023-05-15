import React, { ChangeEvent } from "react";

interface RegionProps {
    selectedValue: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    label: string;
}

const RegionRadio = ({ selectedValue, onChange, label }: RegionProps) => {
    return (
        <label>
            <input
                type="radio"
                value={label}
                checked={selectedValue === label}
                onChange={onChange}
            />
            {label}
        </label>
    );
};


export default RegionRadio;
