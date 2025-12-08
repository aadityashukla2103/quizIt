import React, { useState } from "react";

import { Pane, Input, Select, Typography, Button } from "neetoui";
import * as Yup from "yup";

const STATUS_OPTIONS = [
  { label: "Completed", value: "completed" },
  { label: "Incomplete", value: "incomplete" },
];

const SubmissionsFilterPane = ({ isOpen, onClose, onFilter }) => {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    status: Yup.string().required("Status is required"),
  });

  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setErrors({ ...errors, [key]: "" });
  };

  const handleApply = async () => {
    try {
      await validationSchema.validate(filters, { abortEarly: false });
      onFilter(filters);
      onClose();
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach(err => {
        formattedErrors[err.path] = err.message;
      });
      setErrors(formattedErrors);
    }
  };

  const handleClear = () => {
    setFilters({ name: "", email: "", status: "" });
    setErrors({});
    onFilter({ name: "", email: "", status: "" });
  };

  return (
    <Pane isOpen={isOpen} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Filter Submissions
        </Typography>
      </Pane.Header>
      <Pane.Body>
        <div className="mb-4 w-full">
          <Input
            label="Search by Name"
            placeholder="Enter name"
            value={filters.name}
            onChange={e => handleChange("name", e.target.value)}
          />
          {errors.name && (
            <div className="text-sm text-red-500">{errors.name}</div>
          )}
        </div>
        <div className="mb-4 w-full">
          <Input
            label="Search by Email"
            placeholder="Enter email"
            value={filters.email}
            onChange={e => handleChange("email", e.target.value)}
          />
          {errors.email && (
            <div className="text-sm text-red-500">{errors.email}</div>
          )}
        </div>
        <div className="mb-4 w-full">
          <Select
            label="Status"
            options={STATUS_OPTIONS}
            placeholder="Select status"
            value={STATUS_OPTIONS.find(opt => opt.value === filters.status)}
            onChange={val => handleChange("status", val?.value || "")}
          />
          {errors.status && (
            <div className="text-sm text-red-500">{errors.status}</div>
          )}
        </div>
      </Pane.Body>
      <Pane.Footer className="flex items-center gap-x-2">
        <Button label="Apply" onClick={handleApply} />
        <Button label="Clear" style="secondary" onClick={handleClear} />
        <Button label="Cancel" style="text" onClick={onClose} />
      </Pane.Footer>
    </Pane>
  );
};

export default SubmissionsFilterPane;
