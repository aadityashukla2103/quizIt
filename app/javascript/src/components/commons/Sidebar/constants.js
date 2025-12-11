import { Settings } from "neetoicons";

import { GlobeIcon } from "../../../assets/icons";
import allQuizIcon from "../../../assets/icons/allQuizIcon";

export const APP_NAME = "QuizIt";

export const PASSWORD_PATH = "/my/password/edit";
export const PROFILE_PATH = "/my/profile";
export const LOGOUT_PATH = "/logout";

export const SIDENAV_LINKS = [
  {
    label: "Quizzes",
    to: "/quizzes",
    icon: allQuizIcon,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: Settings,
  },
  {
    label: "Explore",
    to: "/publicdashboard",
    icon: GlobeIcon,
    target: "_blank",
  },
];
