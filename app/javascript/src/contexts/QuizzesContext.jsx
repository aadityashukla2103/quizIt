import React, { createContext, useContext, useState, useEffect } from "react";

import quizzesApi from "apis/quizzes";

const QuizzesContext = createContext();
export const useQuizzes = () => useContext(QuizzesContext);

export const QuizzesProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("All Quizzes");
  const [totalQuizCount, setTotalQuizCount] = useState(0);
  const [totalPublishedCount, setTotalPublishedCount] = useState(0);
  const [totalDraftCount, setTotalDraftCount] = useState(0);
  const [status, setStatus] = useState("all"); // all, draft, published

  const fetchQuizzes = async (
    query = "",
    page = 1,
    pageSize = 10,
    currentStatus = status
  ) => {
    try {
      setLoading(true);
      const { data } = await quizzesApi.fetch({
        query,
        status: currentStatus,
        page,
        pageSize,
      });
      setQuizzes(data.quizzes || []);
      setPageTitle(data.title || "All Quizzes");
      setTotalQuizCount(data.totalCount || 0);
      setTotalPublishedCount(data.total_published_quiz_count || 0);
      setTotalDraftCount(data.total_draft_quiz_count || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <QuizzesContext.Provider
      value={{
        quizzes,
        setQuizzes,
        pageTitle,
        fetchQuizzes,
        loading,
        totalQuizCount,
        totalPublishedCount,
        totalDraftCount,
        status,
        setStatus,
      }}
    >
      {children}
    </QuizzesContext.Provider>
  );
};
