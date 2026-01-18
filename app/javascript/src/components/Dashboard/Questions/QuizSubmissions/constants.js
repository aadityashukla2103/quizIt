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

export const validationSchema = Yup.object()
  .shape({
    name: Yup.string().nullable(),
    email: Yup.string().nullable(),
    status: Yup.string().nullable(),
  })
  .test(
    "at-least-one",
    "Please fill at least one filter (Name, Email or Status).",
    values => {
      const name = values?.name?.trim();
      const email = values?.email?.trim();
      const status = values?.status;

      return Boolean(name || email || status);
    }
  );
