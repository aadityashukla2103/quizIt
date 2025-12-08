import React, { useEffect, useState } from "react";

import quizzesApi from "apis/quizzes";
import axios from "axios";
import { Form, Formik } from "formik";
import { Typography } from "neetoui";
import { Input, ActionBlock } from "neetoui/formik";
import { useParams, useHistory } from "react-router-dom";

import {
  PUBLIC_REGISTRATION_INITIAL_VALUES,
  PUBLIC_REGISTRATION_VALIDATION_SCHEMA,
} from "./constants";

const UserRegistrationForm = () => {
  const [quiz, setQuiz] = useState({});
  const { quizId } = useParams();
  const history = useHistory();

  const fetchQuiz = async id => {
    try {
      const response = await quizzesApi.show(id);
      setQuiz(response.data.quiz);
    } catch {
      logger.log("err");
    }
  };

  useEffect(() => {
    fetchQuiz(quizId);
  }, []);

  const handleSubmit = async values => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      quiz_id: quizId,
    };

    try {
      const response = await axios.post("/api/v1/guest_registrations", payload);
      const submissionId = response.data.submission_id;

      history.push(`/quiz/${quizId}/${submissionId}`);
    } catch (error) {
      logger.error(error.response.data.error);
    }
  };

  return (
    <div className="m-auto flex min-h-screen w-[70%] flex-col rounded-2xl p-16">
      <div className="mb-10">
        <Typography
          className="text-4xl font-semibold text-gray-900"
          style="h1"
          textTransform="capitalize"
        >
          {quiz.name}
        </Typography>
      </div>
      <Formik
        initialValues={PUBLIC_REGISTRATION_INITIAL_VALUES}
        validationSchema={PUBLIC_REGISTRATION_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form className="space-y-8">
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Full name*
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  required
                  className="rounded-md"
                  name="firstName"
                  placeholder="First name"
                  size="large"
                />
                <Input
                  required
                  className="rounded-md"
                  name="lastName"
                  placeholder="Last name"
                  size="large"
                />
              </div>
            </div>
            <div>
              <Input
                required
                className="rounded-md"
                label="Email address"
                name="email"
                placeholder="you@example.com"
                size="large"
                type="email"
              />
            </div>
            <ActionBlock
              cancelButtonProps={{
                label: "Go Back",
                className: "w-fit",
                onClick: () => {
                  resetForm();
                  history.goBack();
                },
              }}
              submitButtonProps={{
                className: "mr-3",
                label: "Start Quiz",
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserRegistrationForm;
