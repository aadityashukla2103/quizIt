import React from "react";

import Sidebar from "components/commons/Sidebar";
import {
  DASHBOARD_ROUTES,
  QUIZZES_PATH,
  DASHBOARD_PATH,
} from "components/routeConstants";
import { Route, Redirect, Switch } from "react-router-dom";

const Dashboard = () => (
  <div className="flex h-screen w-full">
    <Sidebar />
    <Switch>
      {DASHBOARD_ROUTES.map(({ path, component }) => (
        <Route exact component={component} key={path} path={path} />
      ))}
      <Redirect from={DASHBOARD_PATH} to={QUIZZES_PATH} />
    </Switch>
  </div>
);

export default Dashboard;
