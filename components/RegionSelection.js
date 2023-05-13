import React from "react";

function RegionSelection({ selectedValue, onChange }) {
    return (
        <div>
            <label>
                <input
                    type="radio"
                    value="JP"
                    checked={selectedValue === "JP"}
                    onChange={onChange}
                />
                JP
            </label>
            <label>
                <input
                    type="radio"
                    value="NA"
                    checked={selectedValue === "NA"}
                    onChange={onChange}
                />
                NA
            </label>
        </div>
    );
}

export default RegionSelection;
