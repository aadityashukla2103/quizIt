import { Notes, Settings } from "neetoicons";

export const APP_NAME = "Wheel";

export const PASSWORD_PATH = "/my/password/edit";
export const PROFILE_PATH = "/my/profile";
export const LOGOUT_PATH = "/logout";

export const SIDENAV_LINKS = [
  {
    label: "Quizzes",
    to: "/notes",
    icon: Notes,
    items: [
      {
        count: 230,
        "data-cy": "agents",
        key: "agents",
        label: "Agents",
        to: "/members/button",
      },
      {
        count: 8,
        "data-cy": "agents",
        key: "clients",
        label: "Clients",
        to: "/members/clients",
      },
    ],
  },
  {
    label: "Settings",
    to: "/settings",
    icon: Settings,
  },
];
