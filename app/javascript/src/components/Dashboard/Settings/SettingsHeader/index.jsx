import React from "react";

import { Tab } from "neetoui";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SettingsHeader = () => {
  const history = useHistory();
  const path = history.location.pathname;

  return (
    <div className="mt-4 flex w-full justify-center gap-4">
      <Tab className="flex justify-center gap-4 ">
        <Tab.Item
          active={path.includes("general")}
          onClick={() => history.push(`/settings/general`)}
        >
          General
        </Tab.Item>
        <Tab.Item
          active={path.includes("redirections")}
          onClick={() => history.push(`/settings/redirections`)}
        >
          Redirections
        </Tab.Item>
        <Tab.Item
          active={path.includes("categories")}
          onClick={() => history.push(`/settings/categories`)}
        >
          Categories
        </Tab.Item>
      </Tab>
    </div>
  );
};

export default SettingsHeader;
