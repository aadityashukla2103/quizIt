import React, { useState, useEffect } from "react";

import categoriesApi from "apis/categories";
import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Header, Scrollable } from "neetoui/layouts";

import CategoryCard from "./CategoryCard";
import AddCategoryModal from "./Form";

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

  const handleDelete = async id => {
    await categoriesApi.destroy(id);
    fetchCategories();
  };

  const categoryOptions = categories.map(cat => ({
    label: cat.name,
    value: cat.id,
  }));

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
          actionBlock={
            <Button
              icon={Plus}
              iconPosition="left"
              label="Add new category"
              style="link"
              onClick={handleAddClick}
            />
          }
          title={`${categories.length} ${
            categories.length === 1 ? "category" : "categories"
          }`}
        />
        <Scrollable className="mt-4 flex-1 overflow-auto p-4">
          {categories.length > 0 ? (
            categories.map(cat => (
              <CategoryCard
                cat={cat}
                categoryOptions={categoryOptions}
                fetchCategories={fetchCategories}
                key={cat.id}
                onDelete={handleDelete}
                onEdit={() => handleEditClick(cat)}
              />
            ))
          ) : (
            <div className="py-4 text-center">No categories found.</div>
          )}
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
