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
import { Link } from "react-router-dom";

import { INITIAL_FILTERS } from "./constants";

import { Column } from "../../../../assets/icons";

const { Menu, MenuItem } = ActionDropdown;
const { Button: MenuItemButton } = MenuItem;

const SubmissionsSubHeader = ({
  submissionsCount,
  setFilterPaneOpen,
  filters,
  visibleColumns,
  toggleColumnVisibility,
  quizId,
  onFilter,
}) => {
  const handleClearFilters = () => {
    onFilter(INITIAL_FILTERS);
  };

  const filtersApplied = filters.name || filters.email || filters.status;

  return (
    <SubHeader
      leftActionBlock={
        <div className="flex items-center gap-4">
          {!filtersApplied && (
            <Typography component="h4" style="h4">
              {submissionsCount}{" "}
              {submissionsCount === 1 ? "Submission" : "Submissions"}
            </Typography>
          )}
          {filtersApplied && (
            <div className="flex items-center gap-3">
              {filters.name && (
                <>
                  <Typography component="h4" style="h4">
                    Name:
                  </Typography>
                  <Typography className="text-gray-400">
                    {filters.name}
                  </Typography>
                </>
              )}
              {filters.email && (
                <>
                  <Typography component="h4" style="h4">
                    Email:
                  </Typography>
                  <Typography className="text-gray-400">
                    {filters.email}
                  </Typography>
                </>
              )}
              {filters.status && (
                <>
                  <Typography component="h4" style="h4">
                    Status:
                  </Typography>
                  <Typography className="text-gray-400">
                    {filters.status}
                  </Typography>
                </>
              )}
              <Button
                label="Clear Filter"
                style="secondary"
                onClick={handleClearFilters}
              />
            </div>
          )}
        </div>
      }
      rightActionBlock={
        <div className="flex items-center gap-2">
          <Link to={`/quiz/${quizId}/report`}>
            <Button icon={Download} style="tertiary" />
          </Link>
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

export default SubmissionsSubHeader;
