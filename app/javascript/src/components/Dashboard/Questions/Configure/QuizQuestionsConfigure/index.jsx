import React, { useEffect, useState } from "react";

import quizzesApi from "apis/quizzes";
import QuizHeader from "components/commons/QuizHeader";
import { Formik, Form as FormikForm } from "formik";
import { Switch, Typography, Button } from "neetoui";
import { useParams, useHistory } from "react-router-dom";

import ConfigureSubHeader from "../ConfigureSubHeader";

const QuizQuestionsOptions = () => {
  const { slug } = useParams();
  const history = useHistory();

  const [quizName, setQuizName] = useState("");
  const [initialValues, setInitialValues] = useState({
    randomizeQuestions: false,
    randomizeOptions: false,
  });

  const fetchQuiz = async () => {
    try {
      const response = await quizzesApi.show(slug);
      setQuizName(response.quiz.name);
      setInitialValues({
        randomizeQuestions: response.quiz.randomize_questions,
        randomizeOptions: response.quiz.randomize_options,
      });
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [slug]);

  const handleSubmit = async values => {
    await quizzesApi.update(slug, {
      quiz: {
        randomize_questions: values.randomizeQuestions,
        randomize_options: values.randomizeOptions,
      },
    });

    history.goBack();
  };

  return (
    <div className="w-full">
      <QuizHeader quizName={quizName} quizSlug={slug} />
      <div className="m-auto w-[80%]">
        <ConfigureSubHeader path="Questions & options" slug={slug} />
        <div className="m-auto mt-12 w-[80%]">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, dirty }) => (
              <FormikForm>
                <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
                  <Switch
                    checked={values.randomizeOptions}
                    label={
                      <div>
                        <Typography style="h3">Randomize choices</Typography>
                        <Typography>
                          Questions shown will be randomly shuffled each time a
                          new candidate takes the quiz.
                        </Typography>
                      </div>
                    }
                    onChange={event =>
                      setFieldValue("randomizeOptions", event.target.checked)
                    }
                  />
                </div>
                <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
                  <Switch
                    checked={values.randomizeQuestions}
                    label={
                      <div>
                        <Typography style="h3">Randomize questions</Typography>
                        <Typography>
                          Questions shown will be randomly shuffled each time a
                          new candidate takes the quiz.
                        </Typography>
                      </div>
                    }
                    onChange={event =>
                      setFieldValue("randomizeQuestions", event.target.checked)
                    }
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    disabled={!dirty}
                    label="Save Changes"
                    style="primary"
                    type="submit"
                  />
                  <Button
                    label="Cancel"
                    style="secondary"
                    onClick={() => history.goBack()}
                  />
                </div>
              </FormikForm>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestionsOptions;
