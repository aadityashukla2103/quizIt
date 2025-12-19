import React, { useEffect, useRef } from "react";

import { Formik, Form } from "formik";
import { Modal, Typography, Button } from "neetoui";
import { Input } from "neetoui/formik";
import * as yup from "yup";

const VALIDATION_SCHEMA = yup.object({
  title: yup.string().required("Category title is required"),
});

const AddCategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  mode = "add",
}) => {
  const innerRef = useRef();

  useEffect(() => {
    innerRef.current?.resetForm?.();
  }, [isOpen]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      innerRef={innerRef}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Modal isOpen={isOpen} onClose={onClose}>
          <Modal.Header>
            <Typography style="h2">
              {mode === "edit" ? "Edit Category" : "New Category"}
            </Typography>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <Input
                autoFocus
                required
                label="Category Title"
                name="title"
                placeholder="Enter category title"
              />
            </Modal.Body>
            <Modal.Footer className="space-x-2">
              <Button
                label={mode === "edit" ? "Update" : "Add"}
                loading={isSubmitting}
                type="submit"
              />
              <Button label="Cancel" style="text" onClick={onClose} />
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default AddCategoryModal;
