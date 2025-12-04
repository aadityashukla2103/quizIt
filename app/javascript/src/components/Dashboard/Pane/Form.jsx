import React, { useEffect, useState } from "react";

import categoriesApi from "apis/categories";
import quizzesApi from "apis/quizzes";
import { Formik, Form as FormikForm } from "formik";
import { Pane } from "neetoui";
import { ActionBlock, Input, Select } from "neetoui/formik";
import { useHistory } from "react-router-dom";

import { QUIZZES_FORM_VALIDATION_SCHEMA } from "../../Quizzes/constants";

const Form = ({ refetchQuizzes, onClose, quiz }) => {
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
        category_id: values.category,
        status: "draft",
      };
      await quizzesApi.create(payload);
      await refetchQuizzes();
      history.push("/quizzes");
      onClose();
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
              name="category"
              options={options}
              placeholder="Select Category"
              onChange={option => setFieldValue("category", option.value)}
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
