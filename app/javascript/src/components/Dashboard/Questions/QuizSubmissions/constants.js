import * as Yup from "yup";

export const STATUS_OPTIONS = [
  { label: "Completed", value: "completed" },
  { label: "Incomplete", value: "incomplete" },
];

export const INITIAL_FILTERS = {
  name: "",
  email: "",
  status: null,
};

export const INITIAL_VISIBLE_COLUMNS = {
  guest_name: true,
  guest_email: true,
  submitted_at: true,
  correct_answers: true,
  wrong_answers: true,
  unanswered: true,
  total_questions: true,
  status: true,
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  status: Yup.string().required("Status is required"),
});
