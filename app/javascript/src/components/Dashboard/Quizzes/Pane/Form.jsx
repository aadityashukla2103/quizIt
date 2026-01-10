import React, { useEffect, useState } from "react";

import categoriesApi from "apis/categories";
import quizzesApi from "apis/quizzes";
import { Formik, Form as FormikForm } from "formik";
import { Pane } from "neetoui";
import { ActionBlock, Input, Select } from "neetoui/formik";
import { useHistory } from "react-router-dom";

import { QUIZZES_FORM_VALIDATION_SCHEMA } from "../constants";

const Form = ({ onClose, quiz }) => {
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await categoriesApi.fetch();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const options = categories.map(category => ({
    label: category.name,
    value: category.id,
  }));

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        ...values,
        status: "draft",
      };

      const response = await quizzesApi.create(payload);
      const slug = response.quiz.slug;
      history.push(`/quizzes/${slug}/questions`);
    } catch (err) {
      logger.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={quiz}
      validationSchema={QUIZZES_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <FormikForm className="w-full">
          <Pane.Body className="space-y-6">
            <Input
              required
              className="w-full flex-grow-0"
              label="Name"
              name="name"
            />
            <Select
              required
              className="w-full flex-grow-0"
              label="Category"
              name="category_id"
              options={options}
              placeholder="Select Category"
              onChange={option => setFieldValue("category_id", option.value)}
            />
          </Pane.Body>
          <Pane.Footer>
            <ActionBlock
              cancelButtonProps={{ onClick: onClose }}
              submitButtonProps={{
                className: "mr-3",
                label: "Create Quiz",
              }}
            />
          </Pane.Footer>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
