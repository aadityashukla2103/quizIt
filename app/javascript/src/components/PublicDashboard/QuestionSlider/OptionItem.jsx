import React from "react";

const OptionItem = ({ option, isSelected, onSelect }) => (
  <div
    className={`cursor-pointer rounded-xl border p-4 transition ${
      isSelected
        ? "border-blue-600 bg-blue-50"
        : "border-gray-300 hover:bg-gray-100"
    }`}
    onClick={onSelect}
  >
    {option.content}
  </div>
);

export default OptionItem;
