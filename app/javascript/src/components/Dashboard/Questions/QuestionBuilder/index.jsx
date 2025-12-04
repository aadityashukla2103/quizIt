import React from "react";

import { Delete, Plus } from "neetoicons";
import { Checkbox } from "neetoui";
import { Form, Input, Button } from "neetoui/formik";

import { INITIAL_VALUES, QUESTION_SCHEMA, isValidQuestion } from "./constants";

const QuestionBuilderNeetoUI = ({ onSave, onSubmitAndNew, onSubmit }) => (
  <div>
    <Form
      formikProps={{
        initialValues: INITIAL_VALUES,
        validationSchema: QUESTION_SCHEMA,
        onSubmit: values => onSave && onSave(values),
      }}
    >
      {({ values, setFieldValue, resetForm }) => {
        const valid = isValidQuestion(values);

        return (
          <>
            <Input
              className="mb-4 w-full"
              inputClassName="border-b-2 border-gray-400 !rounded-none !shadow-none !border-t-0 !border-l-0 !border-r-0 focus:!ring-0 focus:!outline-none focus:border-gray-600"
              label="Type your question here..."
              name="question"
            />
            <div className="space-y-3">
              {values.options.map((opt, i) => (
                <div
                  className="flex items-center overflow-hidden rounded-lg border bg-gray-50"
                  key={i}
                >
                  <div className="flex items-center justify-center px-2">
                    <Checkbox
                      checked={opt.isCorrect}
                      name={`options.${i}.isCorrect`}
                      onChange={e => {
                        const updated = values.options.map((o, idx) => ({
                          ...o,
                          isCorrect: idx === i ? e.target.checked : false,
                        }));
                        setFieldValue("options", updated);
                      }}
                    />
                  </div>
                  <Input
                    className="flex-1 !border-none !bg-transparent px-2 py-2 !shadow-none focus:ring-0"
                    name={`options.${i}.content`}
                    placeholder={`Type option ${i + 1}`}
                  />
                  <div className="flex items-center justify-center px-2">
                    <Button
                      disabled={values.options.length <= 2}
                      icon={Delete}
                      style="text"
                      onClick={() =>
                        setFieldValue(
                          "options",
                          values.options.filter((_, idx) => idx !== i)
                        )
                      }
                    />
                  </div>
                </div>
              ))}
              <Button
                disabled={values.options.length >= 6}
                icon={Plus}
                label="Add new option"
                style="link"
                onClick={() =>
                  setFieldValue("options", [
                    ...values.options,
                    { content: "", isCorrect: false },
                  ])
                }
              />
            </div>
            <div className="mt-4 flex gap-3">
              <Button
                disabled={!valid}
                label="Save"
                style="primary"
                type="submit"
                onClick={() => onSubmit(values)}
              />
              <Button
                disabled={!valid}
                label="Save & add new question"
                style="secondary"
                type="submit"
                onClick={() => {
                  onSubmitAndNew(values);
                  resetForm();
                }}
              />
            </div>
          </>
        );
      }}
    </Form>
  </div>
);
export default QuestionBuilderNeetoUI;
