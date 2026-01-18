import React, { useEffect, useState } from "react";

import submissionsApi from "apis/submissions";
import QuizHeader from "components/commons/QuizHeader";
import { NoData } from "neetoui";
import { Container } from "neetoui/layouts";
import { useParams, useHistory, useLocation } from "react-router-dom";

import { INITIAL_FILTERS, INITIAL_VISIBLE_COLUMNS } from "./constants";
import SubmissionsFilterPane from "./FilterPane";
import SubmissionsHeader from "./SubmissionsHeader";
import SubmissionsSubHeader from "./SubmissionsSubHeader";
import Table from "./Table";

import useDebounce from "../../../../hooks/useDebounce";

const QuizSubmissions = () => {
  const { slug } = useParams();
  const history = useHistory();
  const location = useLocation();

  const [submissions, setSubmissions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [quizName, setQuizName] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [filterPaneOpen, setFilterPaneOpen] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [visibleColumns, setVisibleColumns] = useState(INITIAL_VISIBLE_COLUMNS);

  const debouncedName = useDebounce(nameSearch, 500);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const newPage = Number(params.get("page")) || 1;
    const newPageSize = Number(params.get("page_size")) || 10;

    setPage(newPage);
    setPageSize(newPageSize);
  }, [location.search]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);

      const response = await submissionsApi.fetch(slug, {
        name: debouncedName || filters.name,
        email: filters.email,
        status: filters.status,
        page,
        page_size: pageSize,
      });
      setQuizName(response.data.quiz_name);
      setSubmissions(response.data.submissions || []);
      setTotalCount(response.data.total_count || 0);
    } catch {
      logger.log("Error fetching submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [slug, debouncedName, filters, page, pageSize]);

  const handlePageChange = (currentPage, newPageSize) => {
    const params = new URLSearchParams(location.search);
    params.set("page", currentPage);
    params.set("page_size", newPageSize);

    history.replace({ search: params.toString() });
  };

  const handleFilter = newFilters => {
    setFilters(newFilters);

    const params = new URLSearchParams(location.search);
    params.set("page", 1);
    params.set("page_size", pageSize);
    history.push({ search: params.toString() });
  };

  const handleSearch = value => {
    setNameSearch(value);

    const params = new URLSearchParams(location.search);
    if (value) {
      params.set("name", value);
    } else {
      params.delete("name");
    }
    params.set("page", 1);
    params.set("page_size", pageSize);
    history.push({ search: params.toString() });
  };

  const toggleColumnVisibility = columnKey => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  const isFilterPaneApplied = Boolean(
    filters.name || filters.email || filters.status
  );
  const isAnythingApplied = Boolean(debouncedName || isFilterPaneApplied);

  return (
    <Container className="w-full">
      <SubmissionsFilterPane
        isOpen={filterPaneOpen}
        onClose={() => setFilterPaneOpen(false)}
        onFilter={handleFilter}
      />
      <QuizHeader
        isQuestionBuilder
        questionCount={totalCount}
        quizName={quizName}
        quizSlug={slug}
      />
      <SubmissionsHeader searchTerm={nameSearch} onSearch={handleSearch} />
      <SubmissionsSubHeader
        filters={filters}
        quizId={slug}
        setFilterPaneOpen={setFilterPaneOpen}
        submissionsCount={totalCount}
        toggleColumnVisibility={toggleColumnVisibility}
        visibleColumns={visibleColumns}
        onFilter={handleFilter}
      />
      {!loading && submissions.length === 0 && isAnythingApplied ? (
        <div className="flex h-[60vh] w-full items-center justify-center">
          <div className="flex w-full justify-center">
            <NoData title="No results found" />
          </div>
        </div>
      ) : (
        <Table
          Submissions={submissions}
          currentPageNumber={page}
          defaultPageSize={pageSize}
          handlePageChange={handlePageChange}
          loading={loading}
          totalSubmissionsCount={totalCount}
          visibleColumns={visibleColumns}
        />
      )}
    </Container>
  );
};

export default QuizSubmissions;
