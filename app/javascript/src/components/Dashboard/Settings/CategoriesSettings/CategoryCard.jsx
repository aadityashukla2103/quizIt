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

import Drag from "../../../../assets/icons/Drag";

const { Menu, MenuItem } = ActionDropdown;
const { Button: MenuItemButton } = MenuItem;

const CategoryCard = ({
  cat,
  onEdit,
  categoryOptions,
  fetchCategories,
  dragAttributes,
  dragListeners,
}) => {
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

  return (
    <div className="mb-2 flex items-center gap-3 rounded border p-4">
      <Drag
        className="cursor-grab text-gray-400"
        {...dragAttributes}
        {...dragListeners}
      />
      <Alert
        isOpen={isAlertOpen}
        title="Delete Category"
        message={
          <div>
            You are permanently deleting <b>{cat.name}</b>.
            {cat.quizzes.length > 0 && (
              <>
                <Callout className="mt-2" icon={Warning} style="warning">
                  Move quizzes before deleting.
                </Callout>
                <Select
                  label="Move quizzes to"
                  options={filteredOptions}
                  onChange={opt => setSelectedCategory(opt.value)}
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
      <div className="flex w-full items-center justify-between">
        <div>
          <Typography style="h3">{cat.name}</Typography>
          <Typography>{cat.quizzes?.length || 0} quizzes</Typography>
        </div>
        <Dropdown
          buttonStyle="text"
          icon={MenuHorizontal}
          placement="bottom-end"
        >
          <Menu>
            <MenuItemButton onClick={onEdit}>Edit</MenuItemButton>
            <MenuItemButton style="danger" onClick={() => setIsAlertOpen(true)}>
              Delete
            </MenuItemButton>
          </Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default CategoryCard;
