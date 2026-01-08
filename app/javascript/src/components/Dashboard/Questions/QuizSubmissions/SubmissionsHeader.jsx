import React from "react";

import { Header } from "neetoui/layouts";

const SubmissionsHeader = ({ searchTerm, onSearch }) => (
  <Header
    title="All Submissions"
    searchProps={{
      value: searchTerm,
      onChange: e => onSearch(e.target.value),
      placeholder: "Search by name",
    }}
  />
);

export default SubmissionsHeader;
