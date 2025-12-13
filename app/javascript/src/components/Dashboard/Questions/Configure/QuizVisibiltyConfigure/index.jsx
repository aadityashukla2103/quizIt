import React, { useEffect, useState } from "react";

import quizzesApi from "apis/quizzes";
import QuizHeader from "components/commons/QuizHeader";
import { Formik, Form as FormikForm } from "formik";
import { Switch, Typography, Button, Tooltip } from "neetoui";
import { useParams, useHistory } from "react-router-dom";

import ConfigureSubHeader from "../ConfigureSubHeader";

const QuizVisibility = () => {
  const { quizId } = useParams();
  const [quizVisibility, setQuizVisibility] = useState(false);
  const [quizStatus, setQuizStatus] = useState("");
  const history = useHistory();

  const fetchQuiz = async () => {
    try {
      const response = await quizzesApi.show(quizId);
      setQuizStatus(response.quiz.status);
      setQuizVisibility(response.quiz.show_on_homepage);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const handleSubmit = async values => {
    await quizzesApi.update(quizId, {
      quiz: { show_on_homepage: values.visibility },
    });
    history.goBack();
  };

  return (
    <div className="w-full">
      <QuizHeader quizId={quizId} />
      <div className="m-auto w-[80%]">
        <ConfigureSubHeader path="Quiz visibility" quizId={quizId} />
        <div className="m-auto mt-12 w-[80%]">
          <Formik
            enableReinitialize
            initialValues={{ visibility: quizVisibility }}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, dirty }) => (
              <FormikForm>
                <div className="mb-6 cursor-pointer rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md">
                  <Tooltip
                    placement="top-start"
                    content={
                      quizStatus === "draft"
                        ? "Publish your quiz first"
                        : "Change the visibility of your quiz"
                    }
                  >
                    <Switch
                      checked={values.visibility}
                      className="--neeto-ui-switch-label-margin"
                      disabled={quizStatus === "draft"}
                      label={
                        <div>
                          <Typography style="h3">
                            Show quiz on the homepage
                          </Typography>
                          <Typography>
                            Add this quiz to the public homepage. This will
                            allow everyone to see the quiz and take it.
                          </Typography>
                        </div>
                      }
                      onChange={event =>
                        setFieldValue("visibility", event.target.checked)
                      }
                    />
                  </Tooltip>
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

export default QuizVisibility;
