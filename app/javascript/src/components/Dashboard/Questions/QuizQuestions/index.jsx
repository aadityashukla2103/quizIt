import React, { useEffect, useState } from "react";

import questionsApi from "apis/questions";
import quizzesApi from "apis/quizzes";
import QuizHeader from "components/commons/QuizHeader";
import { Button, PageLoader, NoData, Alert, Typography } from "neetoui";
import { SubHeader, Scrollable, Header } from "neetoui/layouts";
import { useParams, Link, useHistory } from "react-router-dom";

import QuestionCard from "../QuestionCard";

const QuizQuestions = () => {
  const { slug } = useParams();
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
      const response = await quizzesApi.show(slug);
      setQuiz(response.quiz || {});
      setQuestions(response.questions || []);
      setLastUpdatedQuiz(response.last_saved_at || "");
    } catch (error) {
      logger.log(error);
    }
  };

  const updateQuizName = async newName => {
    try {
      await quizzesApi.update(slug, { quiz: { name: newName } });
      setQuiz(prev => ({ ...prev, name: newName }));
    } catch (error) {
      logger.log(error);
    }
  };

  const handleDeleteQuestion = async () => {
    try {
      await questionsApi.destroy(slug, selectedPostIds);
      fetchQuiz();
      setSelectedPostIds([]);
    } catch (error) {
      logger.log(error);
    }
  };

  const handleEditQuestion = (slug, questionId) => {
    history.push(`/quizzes/${slug}/question/${questionId}/edit`);
    fetchQuiz();
  };

  const handleCloneQuestion = async questionId => {
    try {
      const cloned = await questionsApi.clone(slug, questionId);
      setQuestions(prev => [...prev, cloned]);
    } catch (error) {
      logger.log(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchQuiz();
      setLoading(false);
    };

    loadData();
  }, [slug]);

  if (loading) return <PageLoader />;

  return (
    <div className="w-full">
      <Alert
        isOpen={isDeleteAlertOpen}
        title="Delete Question"
        message={
          <Typography style="body2">
            Are you sure you want to delete
            <Typography className="inline" style="h4">
              "{selectedPostName}"
            </Typography>
            Question? This action cannot be undone.
          </Typography>
        }
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
          quizName={quiz.name}
          quizSlug={slug}
          status={quiz.status}
          onTitleChange={updateQuizName}
        />
        <SubHeader
          className="px-0 py-3 md:px-0"
          rightActionBlock={
            <Link to={`/quizzes/${slug}/questions/new`}>
              <Button primary label="Add Question" />
            </Link>
          }
        />
        {Array.isArray(questions) && questions.length > 0 ? (
          <Scrollable
            className="m-auto w-[80%]"
            style={{
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
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
                  onEdit={() => handleEditQuestion(slug, q.id)}
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

export default React.memo(QuizQuestions);
