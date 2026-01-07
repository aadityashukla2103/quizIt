import React, { useEffect, useState } from "react";

import questionsApi from "apis/questions";
import quizzesApi from "apis/quizzes";
import QuizHeader from "components/commons/QuizHeader";
import QuestionBuilderNeetoUI from "components/Dashboard/Questions/QuestionBuilder";
import { useParams, useHistory } from "react-router-dom";

const QuestionCreate = () => {
  const { id: quizId } = useParams();
  const history = useHistory();
  const [quizName, setQuizName] = useState("");
  const [loading, setLoading] = useState(true);
  const [questionsCount, setQuestionsCount] = useState(0);
  const handleSave = async values => {
    try {
      const payload = {
        question: {
          content: values.question,
          options: values.options,
        },
      };
      await questionsApi.create(quizId, payload);
      history.push(`/quizzes/${quizId}/questions`);
    } catch (err) {
      logger.log(err);
    }
  };

  const updateQuizName = async newName => {
    try {
      await quizzesApi.update(quizId, { quiz: { name: newName } });
      setQuizName(prev => ({ ...prev, name: newName }));
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchQuiz = async () => {
    try {
      const response = await quizzesApi.show(quizId);
      setQuestionsCount(response.questions.length);
      setQuizName(response.quiz.name);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  const AddQuestionAndNext = async values => {
    try {
      const payload = {
        content: values.question,
        options: values.options,
      };
      await questionsApi.create(quizId, payload);
      setQuestionsCount(prev => prev + 1);
      history.replace(`/quizzes/${quizId}/questions/new`);
    } catch (err) {
      logger.log(err);
    }
  };

  const AddQuestion = async values => {
    try {
      const payload = {
        content: values.question,
        options: values.options,
      };
      await questionsApi.create(quizId, payload);
      history.push(`/quizzes/${quizId}/questions`);
    } catch (err) {
      logger.log(err);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);
  if (loading) return null;

  return (
    <div className="w-full bg-white px-4 md:bg-transparent md:px-8">
      <div className="w-full">
        <QuizHeader
          isQuestionBuilder
          quizId={quizId}
          quizName={quizName}
          onTitleChange={updateQuizName}
        />
      </div>
      <div className="mx-auto mt-6 w-full max-w-3xl space-y-6 rounded bg-white p-6 shadow md:px-8 md:shadow-lg">
        <div>
          <button
            className="text-indigo-500 hover:underline"
            type="button"
            onClick={() => history.push(`/quizzes/${quizId}/questions`)}
          >
            All Questions
          </button>
          <span className="mx-2">{">"}</span>
          <span className="font-medium text-gray-700">{`Question ${questionsCount}`}</span>
        </div>
        <QuestionBuilderNeetoUI
          quizId={quizId}
          onSave={handleSave}
          onSubmit={AddQuestion}
          onSubmitAndNew={AddQuestionAndNext}
        />
      </div>
    </div>
  );
};

export default QuestionCreate;
