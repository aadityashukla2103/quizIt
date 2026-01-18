import React, { useEffect, useState } from "react";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import ErrorPage from "components/commons/ErrorPage";
import PrivateRoute from "components/commons/PrivateRoute";
import {
  AUTH_ROUTES,
  PRIVATE_ROUTES,
  LOGIN_PATH,
  PUBLIC_ROUTES,
  NOT_FOUND_PATH,
} from "components/routeConstants";
import { useAuthState, useAuthDispatch } from "contexts/auth";
import { useUserDispatch, useUserState } from "contexts/user";
import { PageLoader } from "neetoui";
import PropTypes from "prop-types";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { isPresent } from "utils";
import {
  clearLocalStorageCredentials,
  getFromLocalStorage,
} from "utils/storage";

const Main = props => {
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuthState();
  const { user: userContextState } = useUserState();
  const userDispatch = useUserDispatch();
  const authDispatch = useAuthDispatch();
  const currentUser = userContextState || props?.user;
  const isLoggedIn = isPresent(authToken) && isPresent(currentUser);

  useEffect(() => {
    userDispatch({ type: "SET_USER", payload: { user: props?.user } });
    initializeLogger();
    registerIntercepts(authDispatch);
    setAuthHeaders(setLoading);
  }, [authDispatch, props?.user, userDispatch]);

  useEffect(() => {
    const previousLoginAuthEmail = getFromLocalStorage("authEmail");
    const hasDeviseUserSessionExpired = !props?.user;
    const sessionExpiredButLocalStorageCredsExist =
      hasDeviseUserSessionExpired && previousLoginAuthEmail;

    if (sessionExpiredButLocalStorageCredsExist) clearLocalStorageCredentials();
  }, [props?.user?.email]);

  if (loading) {
    return (
      <div className="m-auto h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        {AUTH_ROUTES.map(route => (
          <Route
            exact
            component={route.component}
            key={route.path}
            path={route.path}
          />
        ))}
        {PUBLIC_ROUTES.map(route => (
          <Route
            exact
            component={route.component}
            key={route.path}
            path={route.path}
          />
        ))}
        <Route exact component={ErrorPage} path={NOT_FOUND_PATH} />
        {PRIVATE_ROUTES.map(route => (
          <PrivateRoute
            component={route.component}
            condition={isLoggedIn}
            exact={route.exact}
            key={route.path}
            path={route.path}
            redirectRoute={LOGIN_PATH}
          />
        ))}
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
};

Main.propTypes = {
  user: PropTypes.object,
};

export default Main;
