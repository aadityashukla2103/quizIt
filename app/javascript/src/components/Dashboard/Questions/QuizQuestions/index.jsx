import React, { useEffect, useState } from "react";

import questionsApi from "apis/questions";
import quizzesApi from "apis/quizzes";
import QuizHeader from "components/commons/QuizHeader";
import { Button, PageLoader, Typography, NoData } from "neetoui";
import { SubHeader } from "neetoui/layouts";
import { useParams, Link } from "react-router-dom";

const QuizShow = () => {
  const { id: quizId } = useParams();

  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuiz = async () => {
    try {
      const response = await quizzesApi.show(quizId);
      setQuiz(response.data);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await questionsApi.fetch(quizId);
      setQuestions(response);
    } catch (error) {
      logger.error(error);
    }
  };

  const updateQuizName = async newName => {
    try {
      await quizzesApi.update(quizId, { quiz: { name: newName } });
      setQuiz(prev => ({ ...prev, name: newName }));
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuiz();
    fetchQuestions();
    setLoading(false);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="w-full">
      <QuizHeader
        quizId={quizId}
        quizName={quiz.name}
        onTitleChange={updateQuizName}
      />
      {/* Add Question Button */}
      <SubHeader
        className="p-4"
        rightActionBlock={
          <Link to={`/quizzes/${quizId}/questions/new`}>
            <Button primary label="Add Question" />
          </Link>
        }
      />
      {/* Empty State */}
      {questions.length === 0 ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <NoData title="There are no questions to show." />
        </div>
      ) : (
        /* Question List */
        <div className="space-y-4 p-6">
          {questions.map(question => (
            <div
              className="cursor-pointer rounded border p-4 hover:shadow"
              key={question.id}
              onClick={() =>
                (window.location.href = `/quizzes/${quizId}/questions/${question.id}`)
              }
            >
              <Typography className="font-semibold">
                {question.content}
              </Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizShow;
