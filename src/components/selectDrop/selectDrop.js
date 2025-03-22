import React from "react";
import "../selectDrop/selectDrop.css";

const SelectDrop = ({ options, onOptionSelect }) => {
  return (
    <div className="selectDrop">
      {options.length > 0 ? (
        options.map((option, index) => (
          <div
            key={index}
            className="dropdown-item"
            onClick={() => onOptionSelect(option)}
          >
            {option}
          </div>
        ))
      ) : (
        <div className="dropdown-item">No results found</div>
      )}
    </div>
  );
};

export default SelectDrop;
