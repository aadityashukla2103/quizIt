import React from "react";

import { Header } from "neetoui/layouts";

const ConfigureHeader = ({ path, slug }) => (
  <Header
    className="mb-4 py-3"
    title={path}
    breadcrumbs={[
      {
        link: `/quizzes/${slug}/configure`,
        text: "Configure",
      },
      {
        text: path,
      },
    ]}
  />
);

export default ConfigureHeader;
