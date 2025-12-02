import React from "react";

import Sidebar from "components/commons/Sidebar";
import {
  DASHBOARD_ROUTES,
  NOTES_PATH,
  DASHBOARD_PATH,
} from "components/routeConstants";
import { QuizzesProvider } from "contexts/QuizzesContext";
import { Route, Redirect, Switch } from "react-router-dom";

const Dashboard = () => (
  <QuizzesProvider>
    <div className="flex h-screen w-full">
      <Sidebar />
      <Switch>
        {DASHBOARD_ROUTES.map(({ path, component }) => (
          <Route exact component={component} key={path} path={path} />
        ))}
        <Redirect from={DASHBOARD_PATH} to={NOTES_PATH} />
      </Switch>
    </div>
  </QuizzesProvider>
);

export default Dashboard;
