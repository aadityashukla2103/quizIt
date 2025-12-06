import React, { useEffect, useState } from "react";

import categoriesApi from "apis/categories";
import { Formik, Form as FormikForm } from "formik";
import { Pane } from "neetoui";
import { ActionBlock, Input, Select } from "neetoui/formik";

import { validationSchema } from "./constants";

const Form = ({ refetchQuizzes, onClose, filters }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await categoriesApi.fetch();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const categoryOptions = categories.map(category => ({
    label: category.name,
    value: category.id,
  }));

  const statusOptions = [
    { label: "Draft", value: "draft" },
    { label: "Published", value: "published" },
  ];

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const filters = {
        query: values.name || "",
        category: values.category || "",
        category_name: values.category_name || "",
        status: values.status || "all",
      };

      await refetchQuizzes(filters);
      onClose();
    } catch (error) {
      logger.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={filters}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <FormikForm className="w-full">
          <Pane.Body className="space-y-6">
            <Input
              className="w-full flex-grow-0"
              label="Name"
              name="name"
              placeholder="Search by name"
            />
            <Select
              className="w-full flex-grow-0"
              label="Category"
              name="category"
              options={categoryOptions}
              placeholder="Search category"
              onChange={option => {
                setFieldValue("category", option.value);
                setFieldValue("category_name", option.label);
              }}
            />
            <Select
              className="w-full flex-grow-0"
              label="Status"
              name="status"
              options={statusOptions}
              placeholder="Select status"
              onChange={option => setFieldValue("status", option.value)}
            />
          </Pane.Body>
          <Pane.Footer>
            <ActionBlock
              cancelButtonProps={{
                label: "Clear Filters",
                onClick: onClose,
              }}
              submitButtonProps={{
                className: "mr-3",
                label: "Done",
              }}
            />
          </Pane.Footer>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
