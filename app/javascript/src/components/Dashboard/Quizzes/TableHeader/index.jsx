import React, { useState, useEffect } from "react";

import categoriesApi from "apis/categories";
import quizzesApi from "apis/quizzes";
import { Filter, Delete } from "neetoicons";
import {
  Dropdown,
  ActionDropdown,
  Checkbox,
  Button,
  Alert,
  Typography,
} from "neetoui";

import ColumnIcon from "../../../../assets/icons/column";

const { Menu, MenuItem } = ActionDropdown;
const { Button: MenuItemButton } = MenuItem;

const ColumnAndFilterDropdown = ({
  visibleColumns,
  toggleColumnVisibility,
  onFilterClick,
  selectedQuizIds,
  setSelectedQuizId,
  setQuizzes,
  quizzesLength,
}) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoriesApi.fetch();
      setCategories(data);
    } catch (error) {
      logger.log(error);
    }
  };

  const handleCategoryChangeAll = async (categoryId, categoryName) => {
    try {
      await quizzesApi.bulkUpdate({
        ids: selectedQuizIds,
        updates: { category_id: categoryId },
      });

      setQuizzes(prev =>
        prev.map(q =>
          selectedQuizIds.includes(q.id)
            ? { ...q, category_name: categoryName }
            : q
        )
      );
      setSelectedQuizId([]);
    } catch (error) {
      logger.log(error);
    }
  };

  const handleStatusChangeAll = async status => {
    try {
      await quizzesApi.bulkUpdate({
        ids: selectedQuizIds,
        updates: { status },
      });

      setQuizzes(prev =>
        prev.map(q => (selectedQuizIds.includes(q.id) ? { ...q, status } : q))
      );
      setSelectedQuizId([]);
    } catch (error) {
      logger.log(error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await quizzesApi.bulkDelete({ ids: selectedQuizIds });
      setQuizzes(prev => prev.filter(q => !selectedQuizIds.includes(q.id)));
      setIsDeleteAlertOpen(false);
      setSelectedQuizId([]);
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <div className="flex w-full items-center justify-between border px-4 py-2">
      <div className="flex items-center gap-3">
        <Typography style="h4">
          {selectedQuizIds.length > 0 ? (
            <>
              <span>{selectedQuizIds.length} quizzes selected </span>
              <span className="text-gray-500">of {quizzesLength} quizzes</span>
            </>
          ) : (
            `${quizzesLength} quizzes`
          )}
        </Typography>
        {selectedQuizIds.length > 0 && (
          <>
            <ActionDropdown buttonStyle="secondary" label="Change Category">
              <Menu>
                {categories.map(category => (
                  <MenuItemButton
                    key={category.id}
                    onClick={() =>
                      handleCategoryChangeAll(category.id, category.name)
                    }
                  >
                    {category.name}
                  </MenuItemButton>
                ))}
              </Menu>
            </ActionDropdown>
            <ActionDropdown buttonStyle="secondary" label="Change Status">
              <Menu>
                <MenuItemButton
                  onClick={() => handleStatusChangeAll("published")}
                >
                  Published
                </MenuItemButton>
                <MenuItemButton onClick={() => handleStatusChangeAll("draft")}>
                  Draft
                </MenuItemButton>
              </Menu>
            </ActionDropdown>
            <Button
              icon={Delete}
              iconPosition="right"
              label="Delete"
              style="danger"
              onClick={() => setIsDeleteAlertOpen(true)}
            />
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
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
                label="Submissions"
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
      <Alert
        isOpen={isDeleteAlertOpen}
        title="Delete Quizzes"
        message={`Are you sure you want to delete ${
          selectedQuizIds.length
        } quiz${selectedQuizIds.length > 1 ? "es" : ""}?`}
        onClose={() => setIsDeleteAlertOpen(false)}
        onSubmit={handleDeleteAll}
      />
    </div>
  );
};

export default React.memo(ColumnAndFilterDropdown);
