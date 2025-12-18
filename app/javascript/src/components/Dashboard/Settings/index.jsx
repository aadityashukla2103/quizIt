import React from "react";

import { Tab } from "neetoui";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Organization from "./Organization";

const Settings = () => {
  const history = useHistory();
  const path = history.location.pathname;

  return (
    <div className="w-full">
      <div className="mt-4 flex w-full justify-center gap-4">
        <Tab className="flex justify-center gap-4 ">
          <Tab.Item
            active={path.includes("setting")}
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
      <Organization />
    </div>
  );
};

export default Settings;
