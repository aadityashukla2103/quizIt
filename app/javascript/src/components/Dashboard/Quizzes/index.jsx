import React, { useState, useEffect } from "react";

import EmptyQuizzesListImage from "assets/images/EmptyQuizzesList";
import EmptyState from "components/commons/EmptyState";
import { useQuizzes } from "contexts/QuizzesContext";
import { Button, PageLoader, Typography } from "neetoui";
import { Container, Header, SubHeader } from "neetoui/layouts";
import { useHistory, useLocation } from "react-router-dom";

import FilterPane from "./FilterPane/Create";
import NewQuizPane from "./Pane/Create";
import Table from "./Table";
import TableHeader from "./TableHeader";

import useDebounce from "../../../hooks/useDebounce";

const Quizzes = () => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("query") || "";

  const {
    quizzes,
    fetchQuizzes,
    loading,
    pageTitle,
    setQuizzes,
    totalQuizCount,
    status,
  } = useQuizzes();

  const [showNewQuizPane, setShowNewQuizPane] = useState(false);
  const [showFilterPane, setShowFilterPane] = useState(false);

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [selectedQuizIds, setSelectedQuizIds] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filtersApplied, setFiltersApplied] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    query: "",
    categoryName: "",
    status: "",
  });

  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    category: true,
    status: true,
    submissions: true,
    createdAt: true,
  });

  const toggleColumnVisibility = column => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const updateURL = (
    currentPage = page,
    currentPageSize = pageSize,
    filters = selectedFilters
  ) => {
    const params = new URLSearchParams();

    if (debouncedSearchTerm) params.set("query", debouncedSearchTerm);

    if (filters.status) params.set("status", filters.status);

    params.set("page", currentPage);
    params.set("pageSize", currentPageSize);

    history.replace({ search: params.toString() });
  };

  useEffect(() => {
    fetchQuizzes(
      { query: debouncedSearchTerm, category: "", status },
      page,
      pageSize
    );

    updateURL();
  }, [debouncedSearchTerm, page, pageSize, status]);

  const handlePageChange = (currentPage, newPageSize) => {
    setPage(currentPage);
    setPageSize(newPageSize);

    fetchQuizzes({
      query: debouncedSearchTerm,
      category: "",
      status,
      page: currentPage,
      pageSize: newPageSize,
    });

    updateURL(currentPage, newPageSize);
  };

  const handleFilterSubmit = filters => {
    const newPage = 1;
    setPage(newPage);

    const newSelectedFilters = {
      query: filters.query || "",
      categoryName: filters.category_name || "",
      status: filters.status || "",
    };

    setSelectedFilters(newSelectedFilters);
    setFiltersApplied(true);

    fetchQuizzes({ ...filters, page: newPage, pageSize });
  };

  const handleClearFilters = () => {
    const newPage = 1;
    setPage(newPage);

    const clearedFilters = {
      query: "",
      categoryName: "",
      status: "",
    };

    setSelectedFilters(clearedFilters);
    setFiltersApplied(false);

    fetchQuizzes({
      query: "",
      category: "",
      status: "all",
      page: newPage,
      pageSize,
    });

    updateURL(newPage, pageSize, clearedFilters);
  };

  return (
    <Container isHeaderFixed className="overflow-x-auto">
      <Header
        title={pageTitle}
        actionBlock={
          <Button
            icon="ri-add-line"
            label="Add new quiz"
            size="small"
            onClick={() => setShowNewQuizPane(true)}
          />
        }
        searchProps={{
          value: searchTerm,
          onChange: e => setSearchTerm(e.target.value),
        }}
      />
      {loading && <PageLoader />}
      {quizzes.length || filtersApplied ? (
        <>
          <TableHeader
            fetchQuizzes={fetchQuizzes}
            quizzesLength={quizzes.length}
            selectedQuizIds={selectedQuizIds}
            setQuizzes={setQuizzes}
            setSelectedQuizId={setSelectedQuizIds}
            toggleColumnVisibility={toggleColumnVisibility}
            visibleColumns={visibleColumns}
            onFilterClick={() => setShowFilterPane(true)}
          />
          {filtersApplied && (
            <SubHeader
              leftActionBlock={
                <div className="flex items-center gap-3">
                  <Typography component="h4" style="h4">
                    Category:
                  </Typography>
                  <Typography className="text-gray-400">
                    {selectedFilters.categoryName}
                  </Typography>
                  <Button
                    label="Clear filters"
                    style="secondary"
                    onClick={handleClearFilters}
                  />
                </div>
              }
            />
          )}
          <div className="w-full overflow-x-auto px-4">
            <Table
              currentPageNumber={page}
              defaultPageSize={pageSize}
              handlePageChange={handlePageChange}
              loading={loading}
              quizzes={quizzes}
              selectedQuizIds={selectedQuizIds}
              setQuizzes={setQuizzes}
              setSelectedQuizIds={setSelectedQuizIds}
              totalQuizCount={totalQuizCount}
              visibleColumns={visibleColumns}
            />
          </div>
        </>
      ) : (
        <EmptyState
          image={<EmptyQuizzesListImage />}
          primaryActionLabel="Add new quiz"
          title="No quiz found!"
        />
      )}
      <NewQuizPane
        fetchQuizzes={fetchQuizzes}
        setShowPane={setShowNewQuizPane}
        showPane={showNewQuizPane}
      />
      <FilterPane
        fetchQuizzes={handleFilterSubmit}
        setShowPane={setShowFilterPane}
        showPane={showFilterPane}
      />
    </Container>
  );
};

export default Quizzes;
