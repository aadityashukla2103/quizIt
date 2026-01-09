import React, { useState, useEffect } from "react";

import { Check, Close } from "neetoicons";
import { Input } from "neetoui";

const InlineEdit = ({ value = "", onSave }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setText(value);
    setLocalValue(value);
  }, [value]);

  const isChanged = text.trim() !== localValue;

  const handleSave = () => {
    if (!isChanged) return;

    const updatedValue = text.trim();
    setLocalValue(updatedValue);
    onSave(updatedValue);
    setEditing(false);
  };

  const handleCancel = () => {
    setText(localValue);
    setEditing(false);
  };

  return (
    <div
      className={`relative inline-block rounded transition-colors
        ${
          editing
            ? "border border-gray-300"
            : "hover:border hover:border-gray-300"
        }
      `}
    >
      {editing ? (
        <>
          <Input
            autoFocus
            nakedInput
            className="h-8 border-0 pr-16 text-xl font-semibold shadow-none focus:shadow-none focus:ring-0"
            value={text}
            onChange={e => setText(e.target.value)}
            onPressEnter={handleSave}
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
            <Check
              size={16}
              className={
                isChanged
                  ? "cursor-pointer text-green-600"
                  : "cursor-not-allowed text-gray-300"
              }
              onClick={handleSave}
            />
            <Close
              className="cursor-pointer text-red-500"
              size={16}
              onClick={handleCancel}
            />
          </div>
        </>
      ) : (
        <span
          className="block max-w-[300px] cursor-pointer truncate rounded px-2 text-xl font-semibold"
          title={localValue}
          onClick={() => setEditing(true)}
        >
          {localValue}
        </span>
      )}
    </div>
  );
};

export default InlineEdit;
