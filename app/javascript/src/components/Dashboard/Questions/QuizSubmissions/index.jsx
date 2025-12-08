import React, { useEffect, useState } from "react";

import submissionsApi from "apis/submissions";
import QuizHeader from "components/commons/QuizHeader";
import { Container } from "neetoui/layouts";
import { useParams } from "react-router-dom";

import SubmissionsFilterPane from "./FilterPane";
import SubmissionsHeader from "./SubmissionsHeader";
import SubmissionsSubHeader from "./SubmissionsSubHeader";
import Table from "./Table";

import useDebounce from "../../../../hooks/useDebounce";

const QuizSubmissions = () => {
  const { quizId } = useParams();

  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPaneOpen, setFilterPaneOpen] = useState(false);

  const [filters, setFilters] = useState({ name: "", email: "", status: "" });

  const [visibleColumns, setVisibleColumns] = useState({
    guest_name: true,
    guest_email: true,
    submitted_at: true,
    correct_answers: true,
    wrong_answers: true,
    unanswered: true,
    total_questions: true,
    status: true,
  });

  const debouncedSearch = useDebounce(searchTerm, 500);

  const fetchSubmissions = async () => {
    try {
      const response = await submissionsApi.fetch(quizId, {
        search: debouncedSearch,
        name: filters.name,
        email: filters.email,
        status: filters.status,
      });

      setSubmissions(response.data);
    } catch {
      logger.log("Error fetching submissions");
    }
  };

  const handleFilter = newFilters => {
    setFilters(newFilters);
  };

  const toggleColumnVisibility = columnKey => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  useEffect(() => {
    fetchSubmissions();
  }, [quizId, debouncedSearch, filters]);

  return (
    <Container className="w-full">
      <SubmissionsFilterPane
        isOpen={filterPaneOpen}
        onClose={() => setFilterPaneOpen(false)}
        onFilter={handleFilter}
      />
      <QuizHeader
        isQuestionBuilder
        questionCount={submissions.length}
        quizId={quizId}
      />
      <SubmissionsHeader
        searchTerm={searchTerm}
        setFilterPaneOpen={setFilterPaneOpen}
        setSearchTerm={setSearchTerm}
        submissionsCount={submissions.length}
      />
      <SubmissionsSubHeader
        filters={filters}
        setFilterPaneOpen={setFilterPaneOpen}
        setFilters={setFilters}
        submissionsCount={submissions.length}
        toggleColumnVisibility={toggleColumnVisibility}
        visibleColumns={visibleColumns}
        onFilter={handleFilter}
      />
      <Table Submissions={submissions} visibleColumns={visibleColumns} />
    </Container>
  );
};

export default QuizSubmissions;
