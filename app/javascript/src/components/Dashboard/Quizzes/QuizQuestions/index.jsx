import React, { useEffect, useState } from "react";

import questionsApi from "apis/questions";
import quizzesApi from "apis/quizzes";
import InlineEdit from "components/commons/InlineEdit";
import { LeftArrow } from "neetoicons";
import { Button, PageLoader, Typography, Tab, NoData } from "neetoui";
import { SubHeader } from "neetoui/layouts";
import { useParams, useHistory, Link } from "react-router-dom";

const QuizShow = () => {
  const { id: quizId } = useParams();
  const history = useHistory();

  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuiz = async () => {
    try {
      const response = await quizzesApi.show(quizId);
      logger.log("res", response.data);
      setQuiz(response.data);
    } catch (error) {
      logger.log(error);
    }
  };

  // ⭐ FETCH ALL QUESTIONS
  const fetchQuestions = async () => {
    try {
      const response = await questionsApi.fetch(quizId);
      logger.log("questions", response);
      setQuestions(response);
    } catch (error) {
      logger.log(error);
    }
  };

  const updateQuizName = async newName => {
    try {
      await quizzesApi.update(quizId, { quiz: { name: newName } });
      setQuiz(prev => ({ ...prev, name: newName }));
    } catch (error) {
      logger.log(error);
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
      {/* header  */}
      <div className="w-full border-b px-6 py-3">
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center gap-3">
            <LeftArrow
              className="cursor-pointer"
              onClick={() => history.goBack()}
            />
            <InlineEdit value={quiz.name} onSave={updateQuizName} />
          </div>
          <div className="flex justify-center gap-4">
            <Tab.Item active>Questions</Tab.Item>
            <Tab.Item>Submissions</Tab.Item>
          </div>
        </div>
      </div>
      <SubHeader
        className="p-4"
        rightActionBlock={
          <Link to={`/quizzes/${quizId}/questions/new`}>
            <Button primary label="Add Question" />
          </Link>
        }
      />
      {questions.length === 0 ? (
        <div className="flex min-h-[60vh] w-full items-center justify-center">
          <NoData title="There are no questions to show." />
        </div>
      ) : (
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
