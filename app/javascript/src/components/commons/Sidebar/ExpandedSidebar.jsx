import React, { useCallback } from "react";

import authenticationApi from "apis/authentication";
import { LOGIN_PATH } from "components/routeConstants";
import { useAuthDispatch } from "contexts/auth";
import { useUserState } from "contexts/user";
import { Collapse } from "neetoicons";
import { Avatar } from "neetoui";
import { useHistory, useLocation } from "react-router-dom";

const NewSidebar = ({ onClose = () => {}, currentUser }) => {
  const { user } = useUserState();
  const slug = currentUser?.organization?.slug;
  const authDispatch = useAuthDispatch();
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const activeFilter = queryParams.get("status") || "all";

  const handleFilter = useCallback(
    status => {
      const params = new URLSearchParams(location.search);

      if (status === "all") {
        params.delete("status");
      } else {
        params.set("status", status);
      }

      params.set("page", 1);

      history.push({
        pathname: "/quizzes",
        search: params.toString(),
      });
    },
    [history, location.search]
  );

  const handleLogout = useCallback(async () => {
    try {
      await authenticationApi.logout();
      authDispatch({ type: "LOGOUT" });
      window.location.href = LOGIN_PATH;
    } catch (err) {
      logger.error(err);
    }
  }, [authDispatch]);

  const getPublicPageUrl = slug => `/publicdashboard/${slug}`;

  return (
    <aside className="relative flex h-full w-64 flex-col justify-between border-r border-gray-200 bg-white px-4 py-6">
      <button
        aria-label="Close sidebar"
        className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
        type="button"
      >
        <Collapse onClick={onClose} />
      </button>
      <div className="space-y-6 pt-6">
        <div className="mt-4">
          <button className="w-full rounded-lg bg-blue-600 px-4 py-3 text-left text-sm font-semibold text-white">
            Quizzes
          </button>
          <nav className="ml-4 mt-4 space-y-2 border-b border-gray-200 pb-4 text-base">
            <button
              className="flex w-full items-center justify-between rounded px-2 py-2"
              onClick={() => handleFilter("all")}
            >
              <span
                className={
                  activeFilter === "all" ? "text-blue-600" : "text-gray-700"
                }
              >
                All
              </span>
            </button>
            <button
              className="flex w-full items-center justify-between rounded px-2 py-2"
              onClick={() => handleFilter("published")}
            >
              <span
                className={
                  activeFilter === "published"
                    ? "text-blue-600"
                    : "text-gray-700"
                }
              >
                Published
              </span>
            </button>
            <button
              className="flex w-full items-center justify-between rounded px-2 py-2"
              onClick={() => handleFilter("draft")}
            >
              <span
                className={
                  activeFilter === "draft" ? "text-blue-600" : "text-gray-700"
                }
              >
                Draft
              </span>
            </button>
          </nav>
        </div>
        <div className="space-y-2 border-b border-gray-200 pb-4 text-base">
          <button
            className="flex w-full items-center rounded px-2 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => history.push("/settings/general")}
          >
            <span className="mr-2">⚙️</span>
            <span>Settings</span>
          </button>
          <button
            className="flex w-full items-center justify-between rounded px-2 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => {
              if (!slug) return;
              window.open(getPublicPageUrl(slug), "_blank");
            }}
          >
            <span className="flex items-center">
              <span className="mr-2">🌐</span>
              <span>Public page</span>
            </span>
            <span>↗</span>
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Avatar
            showTooltip
            size="medium"
            user={{ name: `${user.first_name} ${user.last_name}` }}
          />
          <div className="flex flex-col text-xs">
            <span className="font-semibold text-gray-800">
              {user.first_name} {user.last_name}
            </span>
            <span className="text-gray-500">{user.email}</span>
          </div>
        </div>
        <button
          className="flex items-center text-xs text-gray-500 hover:text-gray-700"
          onClick={handleLogout}
        >
          <span className="mr-2">←</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default React.memo(NewSidebar);
