import React, { useEffect, useState } from "react";

import quizzesApi from "apis/quizzes";
import submissionAnswersApi from "apis/submissionAnswers";
import { useNavigate, useParams } from "react-router-dom";

const PublicQuizQuestions = () => {
  const navigate = useNavigate();
  const { quizId, submissionId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = questions[currentIndex];

  const fetchQuestions = async () => {
    try {
      const response = await quizzesApi.questions(quizId);
      setQuestions(response.data.questions);
      setLoading(false);
    } catch (e) {
      logger.log("Error fetching questions", e);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const submitAnswer = async () => {
    if (!selectedOption) return;

    try {
      await submissionAnswersApi.create({
        submission_answer: {
          submission_id: submissionId,
          question_id: currentQuestion.id,
          option_id: selectedOption.id,
        },
      });

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        navigate(
          `/public/quizzes/${quizId}/submissions/${submissionId}/result`
        );
      }
    } catch (e) {
      logger.log("Error saving answer", e);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-screen max-w-3xl flex-col justify-between p-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Quiz Questions</h1>
        <p className="mt-2 text-gray-500">
          Question {currentIndex + 1} of {questions.length}
        </p>
      </div>
      <div className="mt-10">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          {currentQuestion.question}
        </h2>
        <div className="space-y-4">
          {currentQuestion.options.map(opt => (
            <div
              key={opt.id}
              className={`
                cursor-pointer rounded-xl border p-4 transition
                ${
                  selectedOption?.id === opt.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:bg-gray-100"
                }
              `}
              onClick={() => setSelectedOption(opt)}
            >
              {opt.option}
            </div>
          ))}
        </div>
      </div>
      <button
        disabled={!selectedOption}
        className={`mt-10 w-full rounded-xl py-3 text-lg
          ${
            selectedOption
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "cursor-not-allowed bg-gray-300 text-gray-600"
          }
        `}
        onClick={submitAnswer}
      >
        {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next"}
      </button>
    </div>
  );
};

export default PublicQuizQuestions;
