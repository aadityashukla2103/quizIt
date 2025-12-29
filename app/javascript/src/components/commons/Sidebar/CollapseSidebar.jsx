import React from "react";

import authenticationApi from "apis/authentication";
import { LOGIN_PATH } from "components/routeConstants";
import { useAuthDispatch } from "contexts/auth";
import { useUserState } from "contexts/user";
import { Sidebar as NeetoUISidebar } from "neetoui/layouts";

import { APP_NAME, SIDENAV_LINKS } from "./constants";

const OldSidebar = ({ currentUser }) => {
  const authDispatch = useAuthDispatch();
  const { user } = useUserState();

  const handleLogout = async () => {
    try {
      await authenticationApi.logout();
      authDispatch({ type: "LOGOUT" });
      window.location.href = LOGIN_PATH;
    } catch (error) {
      logger.error(error);
    }
  };

  const bottomLinks = [
    {
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  if (!user) return null;
  const organizationSlug = currentUser?.organization?.slug;
  const navLinks = SIDENAV_LINKS(organizationSlug);

  return (
    <NeetoUISidebar
      appName={APP_NAME}
      navLinks={navLinks}
      profileInfo={{
        name: `${user.first_name} ${user.last_name}`,
        imageUrl: user.profile_image_path || "",
        email: user.email,
        bottomLinks,
      }}
    />
  );
};

export default React.memo(OldSidebar);
