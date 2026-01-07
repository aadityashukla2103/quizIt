import * as yup from "yup";

export const FILTERS_FORM_INITIAL_VALUES = {
  name: "",
  category: [],
  category_name: [],
  status: "",
};

export const validationSchema = yup.object().shape({
  name: yup.string(),
  category: yup.array(),
  status: yup.string(),
});
