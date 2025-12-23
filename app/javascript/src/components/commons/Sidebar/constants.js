import { Settings } from "neetoicons";

import { GlobeIcon } from "../../../assets/icons";
import allQuizIcon from "../../../assets/icons/allQuizIcon";

export const APP_NAME = "QuizIt";

export const PASSWORD_PATH = "/my/password/edit";
export const PROFILE_PATH = "/my/profile";
export const LOGOUT_PATH = "/logout";

export const PUBLIC_DASHBOARD_PATH = "/publicdashboard/:slug";

export const publicDashboardLink = slug =>
  PUBLIC_DASHBOARD_PATH.replace(":slug", slug);

export const SIDENAV_LINKS = organizationSlug => [
  {
    label: "Quizzes",
    to: "/quizzes",
    icon: allQuizIcon,
  },
  {
    label: "Settings",
    to: "/settings/general",
    icon: Settings,
  },
  {
    label: "Explore",
    to: organizationSlug
      ? publicDashboardLink(organizationSlug)
      : "/publicdashboard",
    icon: GlobeIcon,
    target: "_blank",
  },
];
