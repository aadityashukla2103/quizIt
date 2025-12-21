import React, { useState, useEffect } from "react";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import categoriesApi from "apis/categories";
import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Header, Scrollable } from "neetoui/layouts";

import AddCategoryModal from "./Form";
import SortableCategoryCard from "./SortableCategoryCard";

import SettingsHeader from "../SettingsHeader";

const CategoriesSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mode, setMode] = useState("add");

  const fetchCategories = async () => {
    const response = await categoriesApi.fetch();
    setCategories(response);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddClick = () => {
    setMode("add");
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleEditClick = category => {
    setMode("edit");
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleSubmit = async values => {
    if (mode === "add") {
      await categoriesApi.create({ name: values.title });
    } else {
      await categoriesApi.update(selectedCategory.id, {
        name: values.title,
      });
    }

    setShowModal(false);
    fetchCategories();
  };

  const handleDragEnd = async event => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = categories.findIndex(c => c.id === active.id);
    const newIndex = categories.findIndex(c => c.id === over.id);

    const newCategories = arrayMove(categories, oldIndex, newIndex);
    setCategories(newCategories);

    await categoriesApi.reorder({
      category_ids: newCategories.map(c => c.id),
    });
  };

  const categoryOptions = categories.map(cat => ({
    label: cat.name,
    value: cat.id,
  }));

  return (
    <div className="flex h-screen w-full flex-col">
      <SettingsHeader />
      <div className="m-8 flex flex-1 flex-col overflow-hidden">
        <div className="mb-6">
          <Typography style="h1">Manage Categories</Typography>
          <Typography className="text-gray-500" style="h4">
            Create and configure categories of the quizzes
          </Typography>
        </div>
        <Header
          title={`${categories.length} categories`}
          actionBlock={
            <Button
              icon={Plus}
              iconPosition="left"
              label="Add new category"
              style="link"
              onClick={handleAddClick}
            />
          }
        />
        <Scrollable className="mt-4 flex-1 overflow-auto p-4">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={categories.map(c => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {categories.map(cat => (
                <SortableCategoryCard
                  cat={cat}
                  categoryOptions={categoryOptions}
                  fetchCategories={fetchCategories}
                  key={cat.id}
                  onEdit={() => handleEditClick(cat)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </Scrollable>
      </div>
      {showModal && (
        <AddCategoryModal
          isOpen={showModal}
          mode={mode}
          initialValues={{
            title: selectedCategory?.name || "",
          }}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CategoriesSettings;
