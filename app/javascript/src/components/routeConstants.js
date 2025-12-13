import Login from "components/Authentication/Login";
import PasswordReset from "components/Authentication/ResetPassword";
import Signup from "components/Authentication/Signup";
import Dashboard from "components/Dashboard";
import QuizConfigure from "components/Dashboard/Questions/Configure";
import QuizConfigureTiming from "components/Dashboard/Questions/Configure/QuizTiming";
import QuizConfigureVisibilty from "components/Dashboard/Questions/Configure/QuizVisibiltyConfigure";
import DownloadReport from "components/Dashboard/Questions/DownloadReport";
import EditQuestion from "components/Dashboard/Questions/EditQuestion";
import QuestionBuilder from "components/Dashboard/Questions/QuestionCreate";
import QuizQuestions from "components/Dashboard/Questions/QuizQuestions";
import QuizSubmissions from "components/Dashboard/Questions/QuizSubmissions";
import Quizzes from "components/Dashboard/Quizzes";
import Settings from "components/Dashboard/Settings";
import PublicDashboard from "components/PublicDashboard";

import PublicQuizResult from "./PublicDashboard/PublicQuizResult";
import PublicQuizQuestions from "./PublicDashboard/QuestionSlider";
import UserRegistrationForm from "./PublicDashboard/UserRegistration";

export const PUBLIC_DASHBOARD_PATH = "/publicdashboard";
export const PUBLIC_REGISTER_PATH = "/publicdashboard/register/:quizId";
export const PUBLIC_QUIZ_PATH = "/public/quiz/:quizId/:submissionId";
export const PUBLIC_QUIZ_RESULT_PATH =
  "/public/quizzes/:quizId/submissions/:submissionId/result";

export const SUBMISSION_REPORT_DOWNLOAD = "/quiz/:quizId/report";
export const DASHBOARD_PATH = "/";
export const QUIZZES_PATH = "/quizzes";
export const QUIZ_QUESTIONS_PATH = "/quizzes/:id/questions";
export const QUESTION_CREATE_PATH = "/quizzes/:id/questions/new";
export const QUESTION_EDIT_PATH = "/quizzes/:quizId/question/:questionId/edit";
export const QUIZ_CONFIGURE_PATH = "/quizzes/:quizId/configure";
export const QUIZ_CONFIGURE_VISIBILITY_PATH =
  "/quizzes/:quizId/configure/visibility";

export const QUIZ_CONFIGURE_TIMING_PATH = "/quizzes/:quizId/configure/timing";

export const QUIZ_SUBMISSIONS_PATH = "/quizzes/:quizId/submissions";

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
  {
    path: QUIZ_SUBMISSIONS_PATH,
    component: QuizSubmissions,
  },
  {
    path: SUBMISSION_REPORT_DOWNLOAD,
    component: DownloadReport,
  },
  {
    path: QUIZ_CONFIGURE_PATH,
    component: QuizConfigure,
  },
  {
    path: QUIZ_CONFIGURE_VISIBILITY_PATH,
    component: QuizConfigureVisibilty,
  },
  {
    path: QUIZ_CONFIGURE_TIMING_PATH,
    component: QuizConfigureTiming,
  },
];

export const PUBLIC_ROUTES = [
  {
    path: PUBLIC_DASHBOARD_PATH,
    component: PublicDashboard,
  },
  {
    path: PUBLIC_QUIZ_PATH,
    component: PublicQuizQuestions,
  },
  {
    path: PUBLIC_REGISTER_PATH,
    component: UserRegistrationForm,
  },
  {
    path: PUBLIC_QUIZ_RESULT_PATH,
    component: PublicQuizResult,
  },
];
