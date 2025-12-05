import React, { useState, useEffect } from "react";

import { Input } from "antd";

const InlineEdit = ({ value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleSave = () => {
    setEditing(false);
    if (text.trim() !== value) {
      onSave(text.trim());
    }
  };

  return (
    <div className="inline-block">
      {editing ? (
        <Input
          autoFocus
          className="h-8 px-2 text-xl font-semibold"
          value={text}
          style={{
            padding: "0 8px",
            height: "32px",
            lineHeight: "32px",
          }}
          onBlur={handleSave}
          onChange={e => setText(e.target.value)}
          onPressEnter={handleSave}
        />
      ) : (
        <span
          className="inline-flex max-w-[300px] cursor-pointer items-center truncate rounded px-2 text-xl font-semibold"
          title={text}
          style={{
            height: "32px",
            lineHeight: "32px",
          }}
          onClick={() => setEditing(true)}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default InlineEdit;
