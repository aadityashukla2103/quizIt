import React from "react";

import QuizHeader from "components/commons/QuizHeader";
import { Eye, Clock, Notification, Settings } from "neetoicons";
import { Typography } from "neetoui";
import { Container, Header } from "neetoui/layouts";
import { useParams, useHistory } from "react-router-dom";

const QuizConfigure = () => {
  const { quizId } = useParams();
  const history = useHistory();

  const handleRedirect = path => {
    history.push(`/quizzes/${quizId}/configure/${path}`);
  };

  return (
    <div className="flex w-full flex-col">
      <QuizHeader quizId={quizId} />
      <Container className="flex w-full bg-red-300">
        <div className="m-auto h-full w-[70%] p-8">
          <Header className="mb-4 w-full" title="Quiz settings" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              onClick={() => handleRedirect("visibility")}
            >
              <div className="mb-2 flex items-center gap-2">
                <Eye />
                <Typography style="h4">Quiz visibility</Typography>
              </div>
              <Typography style="body2">
                Settings for showing quiz on the public home page
              </Typography>
            </div>
            <div
              className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              onClick={() => handleRedirect("timing")}
            >
              <div className="mb-2 flex items-center gap-2">
                <Clock />
                <Typography style="h4">Quiz timing</Typography>
              </div>
              <Typography style="body2">
                Settings related to timers for the quiz
              </Typography>
            </div>
            <div
              className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              onClick={() => handleRedirect("questions")}
            >
              <div className="mb-2 flex items-center gap-2">
                <Settings />
                <Typography style="h4">Questions & options</Typography>
              </div>
              <Typography style="body2">
                Settings to configure options and question preferences
              </Typography>
            </div>
            <div
              className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              onClick={() => handleRedirect("notifications")}
            >
              <div className="mb-2 flex items-center gap-2">
                <Notification />
                <Typography style="h4">Email notifications</Typography>
              </div>
              <Typography style="body2">
                Configure email notifications
              </Typography>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default QuizConfigure;
