import React from "react";

import { Filter } from "neetoicons";
import { Dropdown, ActionDropdown, Checkbox } from "neetoui";

import ColumnIcon from "../../../../assets/icons/column";

const { Menu, MenuItem } = ActionDropdown;
const { Button: MenuItemButton } = MenuItem;

const ColumnAndFilterDropdown = ({
  visibleColumns,
  toggleColumnVisibility,
  onFilterClick,
}) => (
  <div className="align-center flex justify-center gap-2">
    <Dropdown buttonStyle="tertiary" icon={ColumnIcon}>
      <Menu>
        <MenuItemButton>
          <Checkbox disabled checked={visibleColumns.name} label="Name" />
        </MenuItemButton>
        <MenuItemButton>
          <Checkbox
            checked={visibleColumns.category}
            label="Category"
            onChange={() => toggleColumnVisibility("category")}
          />
        </MenuItemButton>
        <MenuItemButton>
          <Checkbox
            checked={visibleColumns.status}
            label="Status"
            onChange={() => toggleColumnVisibility("status")}
          />
        </MenuItemButton>
        <MenuItemButton>
          <Checkbox
            checked={visibleColumns.submissions}
            label="Submission Count"
            onChange={() => toggleColumnVisibility("submissions")}
          />
        </MenuItemButton>
        <MenuItemButton>
          <Checkbox
            checked={visibleColumns.createdAt}
            label="Created On"
            onChange={() => toggleColumnVisibility("createdAt")}
          />
        </MenuItemButton>
      </Menu>
    </Dropdown>
    <Filter onClick={onFilterClick} />
  </div>
);

export default ColumnAndFilterDropdown;
