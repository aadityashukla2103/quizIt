import * as yup from "yup";

export const NOTES_FORM_INITIAL_FORM_VALUES = {
  name: "",
  status: "",
  category_id: "",
};

export const NOTES_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required"),
  status: yup.string().required("Status is required"),
  category_id: yup.string().required("Category is required"),
});

export const NOTES_TABLE_COLUMN_DATA = [
  {
    title: "Quiz Name",
    dataIndex: "name",
    key: "name",
    width: "30%",
  },
  {
    title: "Category",
    dataIndex: "category_name",
    key: "category_name",
    width: "30%",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "20%",
  },
  {
    title: "Submissions",
    dataIndex: "submission_count",
    key: "submission_count",
    width: "20%",
  },
];
