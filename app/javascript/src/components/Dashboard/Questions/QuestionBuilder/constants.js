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
        content: Yup.string()
          .transform(value => value?.trim())
          .required("Option text is required"),
        isCorrect: Yup.boolean(),
      })
    )
    .min(2, "At least two options required")
    .test("unique-options", "Options must be unique", function (options) {
      if (!options) return true;

      const seen = {};
      const errors = [];

      options.forEach((opt, index) => {
        const value = opt?.content?.trim().toLowerCase();
        if (!value) return;

        if (seen[value]) {
          errors.push(
            this.createError({
              path: `options.${index}.content`,
              message: "Duplicate option",
            })
          );
        } else {
          seen[value] = true;
        }
      });

      if (errors.length > 0) {
        throw new Yup.ValidationError(errors);
      }

      return true;
    }),
});

export const isQuestionFilled = values => values.question.trim() !== "";

export const areAllOptionsFilled = values =>
  values.options.every(opt => opt.content.trim() !== "");

export const isExactlyOneChecked = values =>
  values.options.filter(opt => opt.isCorrect).length === 1;

export const areOptionsUnique = values => {
  const options = values.options
    .map(opt => opt.content.trim().toLowerCase())
    .filter(Boolean);

  return new Set(options).size === options.length;
};

export const isValidQuestion = values =>
  isQuestionFilled(values) &&
  areAllOptionsFilled(values) &&
  isExactlyOneChecked(values) &&
  areOptionsUnique(values);
