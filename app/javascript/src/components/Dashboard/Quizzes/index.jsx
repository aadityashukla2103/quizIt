import React, { useState, useEffect } from "react";

import EmptyQuizzesListImage from "assets/images/EmptyQuizzesList";
import EmptyState from "components/commons/EmptyState";
import { useQuizzes } from "contexts/QuizzesContext";
import { Button, PageLoader, Typography } from "neetoui";
import { Container, Header, SubHeader } from "neetoui/layouts";
import { useHistory, useLocation } from "react-router-dom";

import DeleteAlert from "./DeleteAlert";
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
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
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

  const updateURL = (currentPage = page, currentPageSize = pageSize) => {
    const params = new URLSearchParams();
    if (debouncedSearchTerm) params.set("query", debouncedSearchTerm);
    params.set("status", status);
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

    fetchQuizzes({ ...filters, page: newPage, pageSize });

    const applied =
      filters.query !== "" ||
      filters.category !== "" ||
      filters.status !== "all";
    setFiltersApplied(applied);

    setSelectedFilters({
      query: filters.query || "",
      categoryName: filters.category_name || "",
      status: filters.status || "",
    });

    updateURL(newPage, pageSize);
  };

  const handleClearFilters = () => {
    const newPage = 1;
    setPage(newPage);

    fetchQuizzes({
      query: "",
      category: "",
      status: "all",
      page: newPage,
      pageSize,
    });
    setFiltersApplied(false);
    setSelectedFilters({ query: "", categoryName: "", status: "" });

    updateURL(newPage, pageSize);
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
      {quizzes.length ? (
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
                  <Typography className="flex gap-2" component="h4" style="h4">
                    Category:
                    {selectedFilters.categoryName && (
                      <Typography className="text-gray-400">
                        {selectedFilters.categoryName}
                      </Typography>
                    )}
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
          <div className="w-full overflow-x-auto">
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
      {showDeleteAlert && (
        <DeleteAlert
          refetch={fetchQuizzes}
          onClose={() => setShowDeleteAlert(false)}
        />
      )}
    </Container>
  );
};

export default Quizzes;
