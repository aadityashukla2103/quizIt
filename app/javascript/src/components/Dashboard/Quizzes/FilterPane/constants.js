import * as yup from "yup";

export const FILTERS_FORM_INITIAL_VALUES = {
  name: "",
  category: "",
  status: "",
};

export const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  category: yup.string().required("Category is required"),
  status: yup.string().required("Status is required"),
});
