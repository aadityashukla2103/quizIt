import React from "react";

import OptionItem from "./OptionItem";

const OptionsList = ({ options, selectedOption, onSelect }) => (
  <div className="space-y-4">
    {options.map(opt => (
      <OptionItem
        isSelected={selectedOption?.id === opt.id}
        key={opt.id}
        option={opt}
        onSelect={() => onSelect(opt)}
      />
    ))}
  </div>
);

export default OptionsList;
