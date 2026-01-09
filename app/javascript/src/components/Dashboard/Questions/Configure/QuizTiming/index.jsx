import React, { useEffect, useState } from "react";

import quizzesApi from "apis/quizzes";
import QuizHeader from "components/commons/QuizHeader";
import { Formik, Form as FormikForm } from "formik";
import { Switch, Typography, Button, Tooltip, Input } from "neetoui";
import { useParams, useHistory } from "react-router-dom";

import ConfigureSubHeader from "../ConfigureSubHeader";

const QuizTiming = () => {
  const { slug } = useParams();
  const history = useHistory();

  const [quizStatus, setQuizStatus] = useState("");
  const [timeLimit, setTimeLimit] = useState(null);
  const [quizName, setQuizName] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await quizzesApi.show(slug);
        setQuizName(response.quiz.name);
        setQuizStatus(response.quiz.status);
        setTimeLimit(response.quiz.time_limit);
      } catch (error) {
        logger.error(error);
      }
    };

    fetchQuiz();
  }, [slug]);

  const getInitialValues = () => {
    if (!timeLimit || timeLimit === 0) {
      return {
        hasTimer: false,
        hours: 0,
        minutes: 30,
      };
    }

    return {
      hasTimer: true,
      hours: Math.floor(timeLimit / 60),
      minutes: timeLimit % 60,
    };
  };

  const isTimeValid = values => {
    if (!values.hasTimer) return true;

    return !(values.hours === 0 && values.minutes === 0);
  };

  const handleSubmit = async values => {
    let updatedTimeLimit = null;

    if (values.hasTimer) {
      updatedTimeLimit = values.hours * 60 + values.minutes;
    }

    await quizzesApi.update(slug, {
      quiz: {
        time_limit: updatedTimeLimit,
      },
    });

    history.goBack();
  };

  return (
    <div className="w-full">
      <QuizHeader quizName={quizName} quizSlug={slug} />
      <div className="m-auto w-[80%]">
        <ConfigureSubHeader path="Quiz timing" slug={slug} />
        <div className="m-auto mt-12 w-[80%]">
          <Formik
            enableReinitialize
            initialValues={getInitialValues()}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, dirty }) => (
              <FormikForm>
                <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
                  {quizStatus === "draft" ? (
                    <Tooltip content="Publish your quiz first">
                      <div>
                        <Switch
                          disabled
                          checked={values.hasTimer}
                          className="--neeto-ui-switch-label-margin"
                          label={
                            <div>
                              <Typography style="h3">
                                Add timer for the entire quiz
                              </Typography>
                              <Typography>
                                Set a time limit for candidates to complete the
                                quiz.
                              </Typography>
                            </div>
                          }
                        />
                      </div>
                    </Tooltip>
                  ) : (
                    <Switch
                      checked={values.hasTimer}
                      className="--neeto-ui-switch-label-margin"
                      label={
                        <div>
                          <Typography style="h3">
                            Add timer for the entire quiz
                          </Typography>
                          <Typography>
                            Set a time limit for candidates to complete the
                            quiz.
                          </Typography>
                        </div>
                      }
                      onChange={e =>
                        setFieldValue("hasTimer", e.target.checked)
                      }
                    />
                  )}
                  {values.hasTimer && (
                    <div className="mt-6 flex flex-col gap-6">
                      <Input
                        label="Hours"
                        maxLength={2}
                        placeholder="0"
                        value={values.hours}
                        onChange={e => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            setFieldValue("hours", Number(value));
                          }
                        }}
                      />
                      <Input
                        label="Minutes"
                        maxLength={2}
                        placeholder="30"
                        value={values.minutes}
                        onChange={e => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            const minutes = Number(value);
                            if (minutes <= 59) {
                              setFieldValue("minutes", minutes);
                            }
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-4">
                  <Button
                    disabled={!dirty || !isTimeValid(values)}
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

export default QuizTiming;
