import React, { useEffect, useState } from "react";

import submissionsApi from "apis/submissions";
import QuizHeader from "components/commons/QuizHeader";
import { Container } from "neetoui/layouts";
import { useParams, useHistory, useLocation } from "react-router-dom";

import { INITIAL_FILTERS, INITIAL_VISIBLE_COLUMNS } from "./constants";
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
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [visibleColumns, setVisibleColumns] = useState(INITIAL_VISIBLE_COLUMNS);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const history = useHistory();
  const location = useLocation();

  const updateUrl = (newFilters, searchValue) => {
    const params = new URLSearchParams();

    if (searchValue) params.set("search", searchValue);

    if (newFilters.name) params.set("name", newFilters.name);

    if (newFilters.email) params.set("email", newFilters.email);

    if (newFilters.status) params.set("status", newFilters.status);

    history.replace({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

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
    updateUrl(newFilters, searchTerm);
    setFilters(newFilters);
  };

  const handleSearch = value => {
    setSearchTerm(value);
    updateUrl(filters, value);
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
      <SubmissionsHeader searchTerm={searchTerm} onSearch={handleSearch} />
      <SubmissionsSubHeader
        filters={filters}
        quizId={quizId}
        setFilterPaneOpen={setFilterPaneOpen}
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
