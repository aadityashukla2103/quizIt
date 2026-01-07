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

  const urlQuery = queryParams.get("query") || "";
  const urlStatus = queryParams.get("status") || "all";
  const urlPage = Number(queryParams.get("page")) || 1;
  const urlPageSize = Number(queryParams.get("pageSize")) || 10;

  const {
    quizzes,
    fetchQuizzes,
    loading,
    pageTitle,
    setQuizzes,
    totalQuizCount,
    setStatus,
  } = useQuizzes();

  const [showNewQuizPane, setShowNewQuizPane] = useState(false);
  const [showFilterPane, setShowFilterPane] = useState(false);

  const [searchTerm, setSearchTerm] = useState(urlQuery);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [page, setPage] = useState(urlPage);
  const [pageSize, setPageSize] = useState(urlPageSize);

  const [filtersApplied, setFiltersApplied] = useState(
    Boolean(urlQuery || urlStatus !== "all")
  );

  const [selectedFilters, setSelectedFilters] = useState({
    query: urlQuery,
    categoryName: "",
    status: urlStatus,
  });

  const [selectedQuizIds, setSelectedQuizIds] = useState([]);

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

  useEffect(() => {
    setStatus(urlStatus);

    fetchQuizzes(
      {
        query: urlQuery,
        category: "",
        status: urlStatus,
      },
      urlPage,
      urlPageSize
    );

    setPage(urlPage);
    setPageSize(urlPageSize);

    setSelectedFilters(prev => ({
      ...prev,
      query: urlQuery,
      status: urlStatus,
      categoryName: "",
    }));
    setSelectedQuizIds([]);

    setFiltersApplied(Boolean(urlQuery || urlStatus !== "all"));
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (debouncedSearchTerm) {
      params.set("query", debouncedSearchTerm);
    } else {
      params.delete("query");
    }

    params.set("page", 1);

    history.replace({ search: params.toString() });
  }, [debouncedSearchTerm]);

  const handlePageChange = (currentPage, newPageSize) => {
    const params = new URLSearchParams(location.search);

    params.set("page", currentPage);
    params.set("pageSize", newPageSize);

    history.push({ search: params.toString() });
  };

  const handleFilterSubmit = filters => {
    const params = new URLSearchParams();

    if (filters.query) params.set("query", filters.query);

    if (filters.status) params.set("status", filters.status);

    if (filters.category_name) params.set("category", filters.category_name);

    params.set("page", 1);
    params.set("pageSize", pageSize);

    setSelectedFilters({
      query: filters.query || "",
      categoryName: filters.category_name || "",
      status: filters.status || "",
    });

    setFiltersApplied(true);
    setSelectedQuizIds([]);
    history.push({ search: params.toString() });
    setShowFilterPane(false);
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      query: "",
      categoryName: "",
      status: "",
    });
    setFiltersApplied(false);
    setSelectedQuizIds([]);
    history.push({
      search: `?page=1&pageSize=${pageSize}`,
    });
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
                  {selectedFilters.categoryName && (
                    <>
                      <Typography component="h4" style="h4">
                        Category:
                      </Typography>
                      <Typography className="text-gray-400">
                        {selectedFilters.categoryName}
                      </Typography>
                    </>
                  )}
                  {selectedFilters.status && (
                    <>
                      <Typography component="h4" style="h4">
                        Status:
                      </Typography>
                      <Typography className="text-gray-400">
                        {selectedFilters.status}
                      </Typography>
                    </>
                  )}
                  {(selectedFilters.categoryName || selectedFilters.status) && (
                    <Button
                      label="Clear filters"
                      style="secondary"
                      onClick={handleClearFilters}
                    />
                  )}
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
