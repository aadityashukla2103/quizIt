import React, { useEffect, useState } from "react";

import quizzesApi from "apis/quizzes";
import submissionAnswersApi from "apis/submissionAnswers";
import submissionsApi from "apis/submissions";
import { useHistory, useParams } from "react-router-dom";

import ActionButtons from "./ActionButtons";
import Header from "./Header";
import QuestionCard from "./QuestionCard";

const PublicQuizQuestions = () => {
  const history = useHistory();
  const { quizId, submissionId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await quizzesApi.show(quizId);
        const questionsWithAnswers = response.data.questions.map(q => ({
          ...q,
          selected_option_id: null,
        }));
        setQuestions(questionsWithAnswers);
        setLoading(false);
      } catch (e) {
        logger.error("Error fetching questions", e);
      }
    };
    fetchQuestions();
  }, [quizId]);

  useEffect(() => {
    if (!questions.length) return;
    const current = questions[currentIndex];
    const previouslySelected = current.options.find(
      o => o.id === current.selected_option_id
    );
    setSelectedOption(previouslySelected ?? null);
  }, [currentIndex, questions]);

  const handleOptionSelect = option => {
    setSelectedOption(option);
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex].selected_option_id = option.id;
    setQuestions(updatedQuestions);
  };

  const handleSubmitQuiz = async () => {
    try {
      for (const q of questions) {
        await submissionAnswersApi.create({
          submission_answer: {
            submission_id: submissionId,
            question_id: q.id,
            selected_option_id: q.selected_option_id,
          },
        });
      }

      await submissionsApi.finalizeSubmission(submissionId);

      history.replace(
        `/public/quizzes/${quizId}/submissions/${submissionId}/result`
      );
    } catch (e) {
      logger.error("Error submitting quiz", e);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading....
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-screen max-w-3xl flex-col justify-center p-8">
      <Header currentIndex={currentIndex} totalQuestions={questions.length} />
      <QuestionCard
        question={currentQuestion}
        selectedOption={selectedOption}
        onSelect={handleOptionSelect}
      />
      <ActionButtons
        currentIndex={currentIndex}
        total={questions.length}
        onPrev={() => setCurrentIndex(prev => prev - 1)}
        onNext={() => {
          if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
          } else {
            handleSubmitQuiz();
          }
        }}
      />
    </div>
  );
};

export default PublicQuizQuestions;
