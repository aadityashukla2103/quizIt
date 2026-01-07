import React, { useEffect, useState } from "react";

import questionsApi from "apis/questions";
import quizzesApi from "apis/quizzes";
import QuizHeader from "components/commons/QuizHeader";
import QuestionBuilderNeetoUI from "components/Dashboard/Questions/QuestionBuilder";
import { useParams, useHistory } from "react-router-dom";

const EditQuestion = () => {
  const { quizId, questionId } = useParams();
  const history = useHistory();

  const [quizLoading, setQuizLoading] = useState(true);
  const [questionLoading, setQuestionLoading] = useState(true);

  const [quizName, setQuizName] = useState("");
  const [questionData, setQuestionData] = useState(null);

  const fetchQuiz = async () => {
    try {
      const response = await quizzesApi.show(quizId);
      const quiz = response.quiz?.data || response.quiz;
      setQuizName(quiz?.name || "");
    } catch (error) {
      logger.log(error);
    } finally {
      setQuizLoading(false);
    }
  };

  const fetchQuestion = async () => {
    try {
      const response = await questionsApi.show(quizId, questionId);
      const data = response.data;

      setQuestionData({
        question: data.content,
        options: data.options.map(opt => ({
          content: opt.content,
          isCorrect: opt.is_correct,
        })),
      });
    } catch (error) {
      logger.log(error);
    } finally {
      setQuestionLoading(false);
    }
  };

  const handleUpdate = async values => {
    try {
      await questionsApi.update(quizId, questionId, {
        content: values.question,
        options: values.options,
      });
      history.push(`/quizzes/${quizId}/questions`);
    } catch (err) {
      logger.log(err);
    }
  };

  const updateQuizName = async newName => {
    try {
      await quizzesApi.update(quizId, { quiz: { name: newName } });
      setQuizName(newName);
    } catch (error) {
      logger.log(error);
    }
  };

  useEffect(() => {
    fetchQuiz();
    fetchQuestion();
  }, []);

  if (quizLoading || questionLoading || !questionData || quizName === "") {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <QuizHeader
        isQuestionBuilder
        quizId={quizId}
        quizName={quizName}
        onTitleChange={updateQuizName}
      />
      <div className="mx-auto mt-6 w-full max-w-3xl space-y-6 rounded bg-white p-6 shadow">
        <div>
          <button
            className="text-indigo-500 hover:underline"
            type="button"
            onClick={() => history.push(`/quizzes/${quizId}/questions`)}
          >
            All Questions
          </button>
          <span className="mx-2">{">"}</span>
          <span className="font-medium text-gray-700">Edit Question</span>
        </div>
        <QuestionBuilderNeetoUI
          isEdit
          initialValues={questionData}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
};

export default EditQuestion;
