import * as Yup from "yup";

export const INITIAL_VALUES = {
  question: "",
  options: Array.from({ length: 4 }, () => ({
    content: "",
    isCorrect: false,
  })),
};

export const QUESTION_SCHEMA = Yup.object({
  question: Yup.string().required("Question is required"),
  options: Yup.array()
    .of(
      Yup.object({
        text: Yup.string().required("Option text is required"),
        isCorrect: Yup.boolean(),
      })
    )
    .min(2, "At least two options required"),
});

export const isQuestionFilled = values => values.question.trim() !== "";

export const areAllOptionsFilled = values =>
  values.options.every(opt => opt.content.trim() !== "");

export const isExactlyOneChecked = values =>
  values.options.filter(opt => opt.isCorrect).length === 1;

export const isValidQuestion = values =>
  isQuestionFilled(values) &&
  areAllOptionsFilled(values) &&
  isExactlyOneChecked(values);
