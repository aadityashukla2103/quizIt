import Login from "components/Authentication/Login";
import PasswordReset from "components/Authentication/ResetPassword";
import Signup from "components/Authentication/Signup";
import Dashboard from "components/Dashboard";
import EditQuestion from "components/Dashboard/Questions/EditQuestion";
import QuestionBuilder from "components/Dashboard/Questions/QuestionCreate";
import QuizQuestions from "components/Dashboard/Questions/QuizQuestions";
import Quizzes from "components/Dashboard/Quizzes";
import Settings from "components/Dashboard/Settings";

export const DASHBOARD_PATH = "/";
export const QUIZZES_PATH = "/quizzes";
export const QUIZ_QUESTIONS_PATH = "/quizzes/:id/questions";
export const QUESTION_CREATE_PATH = "/quizzes/:id/questions/new";
export const QUESTION_EDIT_PATH = "/quizzes/:quizId/question/:questionId/edit";
export const CHANGE_PASSWORD_PATH = "/settings?tab=password";
export const PROFILE_PATH = "/settings?tab=profile";
export const SETTINGS_PATH = "/settings";
export const LOGIN_PATH = "/login";
export const SIGNUP_PATH = "/signup";
export const RESET_PASSWORD_PATH = "/my/password/new";

export const AUTH_ROUTES = [
  {
    path: RESET_PASSWORD_PATH,
    component: PasswordReset,
  },
  {
    path: SIGNUP_PATH,
    component: Signup,
  },
  {
    path: LOGIN_PATH,
    component: Login,
  },
];

export const PRIVATE_ROUTES = [{ path: DASHBOARD_PATH, component: Dashboard }];

export const DASHBOARD_ROUTES = [
  {
    path: QUIZZES_PATH,
    component: Quizzes,
  },
  {
    path: SETTINGS_PATH,
    component: Settings,
  },
  {
    path: QUIZ_QUESTIONS_PATH,
    component: QuizQuestions,
  },
  {
    path: QUESTION_CREATE_PATH,
    component: QuestionBuilder,
  },
  {
    path: QUESTION_EDIT_PATH,
    component: EditQuestion,
  },
];
