import React, { useEffect, useState } from "react";

import submissionsApi from "apis/submissions";
import { useHistory, useParams } from "react-router-dom";

import CalloutMessage from "./CalloutMessage";
import Header from "./Header";
import NavigationButtons from "./NavigationButtons";
import QuestionBlock from "./QuestionBlock";
import ScoreGrid from "./ScoreGrid";

const PublicQuizResult = () => {
  const { submissionId } = useParams();
  const history = useHistory();

  const [submission, setSubmission] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const currentAnswer = submission?.submission_answers[currentIndex];

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await submissionsApi.show(submissionId);
        setSubmission(response.data);
        logger.log("res", response.data);
      } catch (e) {
        logger.error("Error fetching result", e);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [submissionId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!submission) return <div>Result not found</div>;

  return (
    <div className="mx-auto flex h-screen max-w-3xl flex-col justify-between p-8">
      <Header
        goBack={() => history.push("/publicdashboard")}
        totalQuestions={submission.total_questions}
      />
      <ScoreGrid submission={submission} />
      <QuestionBlock currentAnswer={currentAnswer} />
      <CalloutMessage currentAnswer={currentAnswer} />
      <NavigationButtons
        currentIndex={currentIndex}
        total={submission.submission_answers.length}
        onFinish={() => history.replace("/publicdashboard")}
        onNext={() => setCurrentIndex(prev => prev + 1)}
        onPrev={() => setCurrentIndex(prev => prev - 1)}
      />
    </div>
  );
};

export default PublicQuizResult;
