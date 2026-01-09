import React, { useEffect, useState } from "react";

import quizzesApi from "apis/quizzes";
import QuizHeader from "components/commons/QuizHeader";
import { Formik, Form as FormikForm } from "formik";
import { Switch, Typography, Button } from "neetoui";
import { useParams, useHistory } from "react-router-dom";

import ConfigureSubHeader from "../ConfigureSubHeader";

const QuizEmailNotifications = () => {
  const { slug } = useParams();
  const history = useHistory();

  const [emailNotifications, setEmailNotifications] = useState(false);
  const [quizName, setQuizName] = useState("");

  const fetchQuiz = async () => {
    try {
      const response = await quizzesApi.show(slug);
      setQuizName(response.quiz.name);
      setEmailNotifications(response.quiz.email_notifications);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [slug]);

  const handleSubmit = async values => {
    await quizzesApi.update(slug, {
      quiz: { email_notifications: values.emailNotifications },
    });
    history.goBack();
  };

  return (
    <div className="w-full">
      <QuizHeader quizName={quizName} quizSlug={slug} />
      <div className="m-auto w-[80%]">
        <ConfigureSubHeader path="Email notifications" slug={slug} />
        <div className="m-auto mt-12 w-[80%]">
          <Formik
            enableReinitialize
            initialValues={{ emailNotifications }}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, dirty }) => (
              <FormikForm>
                <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
                  <Switch
                    checked={values.emailNotifications}
                    label={
                      <div>
                        <Typography style="h3">Email notifications</Typography>
                        <Typography>
                          Get an email when someone submits this quiz.
                        </Typography>
                      </div>
                    }
                    onChange={event =>
                      setFieldValue("emailNotifications", event.target.checked)
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

export default QuizEmailNotifications;
