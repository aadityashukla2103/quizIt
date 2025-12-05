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

  const fetchQuiz = async () => {
    try {
      const response = await quizzesApi.show(quizId);
      setQuiz(response.data.quiz);
      setLastUpdatedQuiz(response.data.last_saved_at);
    } catch (error) {
      logger.log(error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await questionsApi.fetch(quizId);
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

  const handleDeleteQuestion = async () => {
    try {
      await questionsApi.destroy(quizId, selectedPostIds);
      await fetchQuestions();
      setSelectedPostIds([]);
    } catch (error) {
      logger.log(error);
    }
  };

  const handleEditQuestion = (quizId, questionId) => {
    history.push(`/quizzes/${quizId}/question/${questionId}/edit`);
  };

  const handleCloneQuestion = async questionId => {
    try {
      const cloned = await questionsApi.clone(quizId, questionId);
      setQuestions(prev => [...prev, cloned]);
    } catch (error) {
      logger.log(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchQuiz();
      await fetchQuestions();
      setLoading(false);
    };
    loadData();
  }, [quizId]);

  if (loading) return <PageLoader />;

  return (
    <>
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
      <div className="max-h-screen w-full">
        <QuizHeader
          lastSavedAt={lastUpdatedQuiz}
          questionCount={questions.length}
          quizId={quizId}
          quizName={quiz.name}
          status={quiz.status}
          onTitleChange={updateQuizName}
        />
        <SubHeader
          className="p-3"
          rightActionBlock={
            <Link to={`/quizzes/${quizId}/questions/new`}>
              <Button primary label="Add Question" />
            </Link>
          }
        />
        {questions.length === 0 ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <NoData title="There are no questions to show." />
          </div>
        ) : (
          <Scrollable>
            <Header
              isHeaderFixed
              className="m-auto w-[70%] "
              reloadQuizData={fetchQuiz}
              size="nano"
              title={`${questions.length} Questions`}
            />
            <div className="m-auto w-[70%] space-y-4 p-6">
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
        )}
      </div>
    </>
  );
};

export default QuizQuestions;
