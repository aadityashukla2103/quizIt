import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Typography, Checkbox, Dropdown, ActionDropdown } from "neetoui";

const { Menu, MenuItem, Divider } = ActionDropdown;
const { Button: MenuItemButton } = MenuItem;

const QuestionCard = ({
  question,
  options = [],
  onEdit,
  onClone,
  onDelete,
}) => (
  <div className="space-y-3 rounded-lg border bg-white p-5 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-start justify-between">
      <Typography className="font-semibold" style="h5">
        {question}
      </Typography>
      <Dropdown buttonStyle="text" icon={MenuHorizontal} placement="bottom-end">
        <Menu>
          <MenuItemButton onClick={onEdit}>Edit</MenuItemButton>
          <MenuItemButton onClick={onClone}>Clone</MenuItemButton>
          <Divider />
          <MenuItemButton style="danger" onClick={onDelete}>
            Delete
          </MenuItemButton>
        </Menu>
      </Dropdown>
    </div>
    <div className="space-y-2">
      {options.map(option => (
        <Checkbox
          checked={option.is_correct}
          className="pointer-events-none"
          id={`option-${option.id}`}
          key={option.id}
          label={option.content}
          onChange={() => {}}
        />
      ))}
    </div>
  </div>
);

export default QuestionCard;
