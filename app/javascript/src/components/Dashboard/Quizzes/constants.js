import * as yup from "yup";

export const QUIZZES_FORM_INITIAL_FORM_VALUES = {
  name: "",
  category: "",
};

export const QUIZZES_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required"),
  category: yup.string().required("Category is required"),
});

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const QUERY_PARAM_KEYS = {
  QUERY: "query",
  STATUS: "status",
  PAGE: "page",
  PAGE_SIZE: "pageSize",
};

export const INITIAL_FILTERS = {
  query: "",
  categoryName: "",
  status: "",
};

export const EMPTY_FILTERS = {
  query: "",
  category: "",
  status: "all",
};

export const INITIAL_PANE_STATE = {
  newQuiz: false,
  filter: false,
  delete: false,
};
