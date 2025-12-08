import React from "react";

import { Download, Filter } from "neetoicons";
import {
  Typography,
  Button,
  Checkbox,
  Dropdown,
  ActionDropdown,
} from "neetoui";
import { SubHeader } from "neetoui/layouts";

import { Column } from "../../../../assets/icons";

const { Menu, MenuItem } = ActionDropdown;
const { Button: MenuItemButton } = MenuItem;

const SubmissionsHeader = ({
  submissionsCount,
  setFilterPaneOpen,
  filters,
  setFilters,
  visibleColumns,
  toggleColumnVisibility,
}) => {
  const handleClearFilters = () => {
    setFilters({ name: "", email: "", status: "" });
  };

  return (
    <SubHeader
      leftActionBlock={
        <div className="flex items-center gap-4">
          <Typography component="h4" style="h4">
            {submissionsCount}{" "}
            {submissionsCount === 1 ? "Submission" : "Submissions"}
          </Typography>
          {(filters.name || filters.email || filters.status) && (
            <Button
              label="Clear Filter"
              style="secondary"
              onClick={handleClearFilters}
            />
          )}
        </div>
      }
      rightActionBlock={
        <div className="flex items-center gap-2">
          <Button icon={Download} style="tertiary" />
          <Dropdown buttonStyle="tertiary" icon={Column}>
            <Menu>
              <MenuItemButton>
                <Checkbox
                  disabled
                  checked={visibleColumns.guest_name}
                  label="Name"
                />
              </MenuItemButton>
              <MenuItemButton>
                <Checkbox
                  checked={visibleColumns.guest_email}
                  label="Email"
                  onChange={() => toggleColumnVisibility("guest_email")}
                />
              </MenuItemButton>
              <MenuItemButton>
                <Checkbox
                  checked={visibleColumns.submitted_at}
                  label="Submission Date"
                  onChange={() => toggleColumnVisibility("submitted_at")}
                />
              </MenuItemButton>
              <MenuItemButton>
                <Checkbox
                  checked={visibleColumns.correct_answers}
                  label="Correct"
                  onChange={() => toggleColumnVisibility("correct_answers")}
                />
              </MenuItemButton>
              <MenuItemButton>
                <Checkbox
                  checked={visibleColumns.wrong_answers}
                  label="Wrong"
                  onChange={() => toggleColumnVisibility("wrong_answers")}
                />
              </MenuItemButton>
              <MenuItemButton>
                <Checkbox
                  checked={visibleColumns.total_questions}
                  label="Total Questions"
                  onChange={() => toggleColumnVisibility("total_questions")}
                />
              </MenuItemButton>
              <MenuItemButton>
                <Checkbox
                  checked={visibleColumns.status}
                  label="Status"
                  onChange={() => toggleColumnVisibility("status")}
                />
              </MenuItemButton>
            </Menu>
          </Dropdown>
          <Button
            icon={Filter}
            style="tertiary"
            onClick={() => setFilterPaneOpen(true)}
          />
        </div>
      }
    />
  );
};

export default SubmissionsHeader;
