import * as yup from "yup";

export const PUBLIC_REGISTRATION_INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
};

export const PUBLIC_REGISTRATION_VALIDATION_SCHEMA = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Only letters allowed")
    .required("Required"),

  lastName: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Only letters allowed")
    .required("Required"),

  email: yup.string().email("Invalid email address").required("Required"),
});
