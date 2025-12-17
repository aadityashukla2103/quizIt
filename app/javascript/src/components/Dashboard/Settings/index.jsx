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
            active={path.includes("questions")}
            onClick={() => history.push(`/settings/general`)}
          >
            Questions
          </Tab.Item>
          <Tab.Item
            active={path.includes("submissions")}
            onClick={() => history.push(`/settings/redirections`)}
          >
            Submissions
          </Tab.Item>
          <Tab.Item
            active={path.includes("configure")}
            onClick={() => history.push(`/settings/categories`)}
          >
            Configure
          </Tab.Item>
        </Tab>
      </div>
      <Organization />
    </div>
  );
};

export default Settings;
