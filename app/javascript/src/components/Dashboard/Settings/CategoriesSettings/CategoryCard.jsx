import React, { useState } from "react";

import categoriesApi from "apis/categories";
import quizzesApi from "apis/quizzes";
import { MenuHorizontal, Warning } from "neetoicons";
import {
  Typography,
  Dropdown,
  ActionDropdown,
  Alert,
  Callout,
  Select,
} from "neetoui";

const { Menu, MenuItem } = ActionDropdown;
const { Button: MenuItemButton } = MenuItem;

const CategoryCard = ({ cat, onEdit, categoryOptions, fetchCategories }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const allQuizzesIds = cat.quizzes.map(q => q.id);
  const filteredOptions = categoryOptions.filter(opt => opt.value !== cat.id);

  const handleSubmit = async () => {
    if (cat.quizzes.length > 0) {
      if (!selectedCategory) return;

      await quizzesApi.bulkUpdate({
        ids: allQuizzesIds,
        updates: {
          category_id: selectedCategory,
        },
      });
    }

    await categoriesApi.destroy(cat.id);
  };

  const handleChange = options => {
    setSelectedCategory(options.value);
  };

  return (
    <div className="mb-2 flex items-center justify-between rounded border p-4">
      <Alert
        isOpen={isAlertOpen}
        title="Delete Category"
        message={
          <div>
            You are permanently deleting <b>{cat.name}</b>. This cannot be
            undone.
            {cat.quizzes.length > 0 && (
              <>
                <Callout className="mt-2" icon={Warning} style="warning">
                  {`Category has ${cat.quizzes.length} ${
                    cat.quizzes.length === 1 ? "quiz" : "quizzes"
                  }. Before this category can be deleted, these quizzes need to be moved to another category.`}
                </Callout>
                <Select
                  label="Select a category to move these quizzes into*"
                  options={filteredOptions}
                  onChange={handleChange}
                />
              </>
            )}
          </div>
        }
        onClose={() => setIsAlertOpen(false)}
        onSubmit={async () => {
          await handleSubmit();
          setIsAlertOpen(false);
          fetchCategories();
        }}
      />
      <div>
        <Typography style="h3">{cat.name}</Typography>
        <Typography>{cat.quizzes?.length || 0} quizzes</Typography>
      </div>
      <Dropdown buttonStyle="text" icon={MenuHorizontal} placement="bottom-end">
        <Menu>
          <MenuItemButton onClick={onEdit}>Edit</MenuItemButton>
          <MenuItemButton style="danger" onClick={() => setIsAlertOpen(true)}>
            Delete
          </MenuItemButton>
        </Menu>
      </Dropdown>
    </div>
  );
};

export default CategoryCard;
