import React, { useState } from "react";

import { Pane, Input, Select, Typography, Button } from "neetoui";

import { STATUS_OPTIONS, INITIAL_FILTERS, validationSchema } from "./constants";

const SubmissionsFilterPane = ({ isOpen, onClose, onFilter }) => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [errors, setErrors] = useState({});

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
    setFilters(INITIAL_FILTERS);
    setErrors({});
    onFilter(INITIAL_FILTERS);
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
            key={filters.status ?? "cleared"}
            label="Status"
            options={STATUS_OPTIONS}
            placeholder="Select status"
            value={STATUS_OPTIONS.find(opt => opt.value === filters.status)}
            onChange={val => handleChange("status", val?.value ?? null)}
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
