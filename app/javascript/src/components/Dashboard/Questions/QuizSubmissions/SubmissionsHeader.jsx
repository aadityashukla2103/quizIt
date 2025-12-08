import React from "react";

import { Header } from "neetoui/layouts";

const SubmissionsHeader = ({ searchTerm, setSearchTerm }) => (
  <Header
    title="All Submissions"
    searchProps={{
      value: searchTerm,
      onChange: e => setSearchTerm(e.target.value),
      placeholder: "Search by name",
    }}
  />
);

export default SubmissionsHeader;
