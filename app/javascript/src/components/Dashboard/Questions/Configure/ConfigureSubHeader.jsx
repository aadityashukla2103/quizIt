import React from "react";

import { Header } from "neetoui/layouts";

const ConfigureHeader = ({ path, quizId }) => (
  <Header
    className="mb-4 py-3"
    title={`${path}`}
    breadcrumbs={[
      {
        link: `/quizzes/${quizId}/configure`,
        text: "Configure",
      },
      {
        text: `${path}`,
      },
    ]}
  />
);

export default ConfigureHeader;
