// @ts-nocheck
/* eslint-disable import/no-unresolved, import/extensions, no-undef */
import React, { useEffect, useState } from "react";

import questionsApi from "apis/questions";
import quizzesApi from "apis/quizzes";
import QuizHeader from "components/commons/QuizHeader";
import { Button, PageLoader, NoData, Alert } from "neetoui";
import { SubHeader, Scrollable, Header } from "neetoui/layouts";
import { useParams, Link, useHistory } from "react-router-dom";

import QuestionCard from "../QuestionCard";

const QuizQuestions = () => {
  const { id: quizId } = useParams();
  const history = useHistory();

  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedPostIds, setSelectedPostIds] = useState([]);
  const [selectedPostName, setSelectedPostName] = useState("");
  const [lastUpdatedQuiz, setLastUpdatedQuiz] = useState("");

  // Fetch quiz data including questions
  const fetchQuiz = async () => {
    try {
      const response = await quizzesApi.show(quizId);
      setQuiz(response.quiz || {});
      setQuestions(response.questions || []);
      setLastUpdatedQuiz(response.last_saved_at || "");
    } catch (error) {
      logger.log(error);
    }
  };

  // Update quiz name
  const updateQuizName = async newName => {
    try {
      await quizzesApi.update(quizId, { quiz: { name: newName } });
      setQuiz(prev => ({ ...prev, name: newName }));
    } catch (error) {
      logger.log(error);
    }
  };

  // Delete a question
  const handleDeleteQuestion = async () => {
    try {
      await questionsApi.destroy(quizId, selectedPostIds);
      fetchQuiz();
      setSelectedPostIds([]);
    } catch (error) {
      logger.log(error);
    }
  };

  // Navigate to edit page
  const handleEditQuestion = (quizId, questionId) => {
    history.push(`/quizzes/${quizId}/question/${questionId}/edit`);
    fetchQuiz();
  };

  // Clone a question
  const handleCloneQuestion = async questionId => {
    try {
      const cloned = await questionsApi.clone(quizId, questionId);
      setQuestions(prev => [...prev, cloned]);
    } catch (error) {
      logger.log(error);
    }
  };

  // Load quiz data on mount and on quizId change
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchQuiz();
      setLoading(false);
    };

    loadData();

    // Optional: refresh data on navigation
    const unlisten = history.listen(() => {
      loadData();
    });

    return () => unlisten();
  }, [quizId]);

  if (loading) return <PageLoader />;

  return (
    <div className="w-full">
      <Alert
        isOpen={isDeleteAlertOpen}
        message={`Are you sure you want to delete "${selectedPostName}" Question? This action cannot be undone.`}
        title="Delete Question"
        onClose={() => setIsDeleteAlertOpen(false)}
        onSubmit={() => {
          handleDeleteQuestion();
          setIsDeleteAlertOpen(false);
        }}
      />
      <div className="min-h-screen w-full bg-white px-4 md:bg-transparent md:px-8">
        <QuizHeader
          lastSavedAt={lastUpdatedQuiz}
          questionCount={questions.length}
          quizId={quizId}
          quizName={quiz.name}
          status={quiz.status}
          onTitleChange={updateQuizName}
        />
        <SubHeader
          className="px-0 py-3 md:px-0"
          rightActionBlock={
            <Link to={`/quizzes/${quizId}/questions/new`}>
              <Button primary label="Add Question" />
            </Link>
          }
        />
        {Array.isArray(questions) && questions.length > 0 ? (
          <Scrollable className="m-auto w-[80%]">
            <Header
              isHeaderFixed
              className="w-full px-0 md:px-0"
              reloadQuizData={fetchQuiz}
              size="nano"
              title={`${questions.length} Questions`}
            />
            <div className="w-full space-y-4 px-0 pb-8 md:px-0">
              {questions.map(q => (
                <QuestionCard
                  key={q.id}
                  options={q.options}
                  question={q.content}
                  onClone={() => handleCloneQuestion(q.id)}
                  onEdit={() => handleEditQuestion(quizId, q.id)}
                  onDelete={() => {
                    setSelectedPostIds([q.id]);
                    setIsDeleteAlertOpen(true);
                    setSelectedPostName(q.content);
                  }}
                />
              ))}
            </div>
          </Scrollable>
        ) : (
          <div className="flex min-h-[60vh] items-center justify-center px-0">
            <NoData title="There are no questions to show." />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestions;
