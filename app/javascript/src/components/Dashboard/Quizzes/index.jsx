import React, { useState, useEffect, useCallback } from "react";

import quizzesApi from "apis/quizzes";
import EmptyQuizzesListImage from "assets/images/EmptyQuizzesList";
import EmptyState from "components/commons/EmptyState";
import { Button, NoData, PageLoader, Typography } from "neetoui";
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

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalQuizCount, setTotalQuizCount] = useState(0);

  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get("page")) || 1;
  const currentPageSize = Number(queryParams.get("pageSize")) || 10;

  const [searchTerm, setSearchTerm] = useState(queryParams.get("query") || "");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const appliedFilterName = queryParams.get("filterQuery") || "";
  const appliedSearchQuery = queryParams.get("query") || "";

  const [filters, setFilters] = useState({
    status: queryParams.get("status") || "",
    category: queryParams.get("category")
      ? queryParams.get("category").split(",")
      : [],
  });

  const isFilterPaneApplied = Boolean(
    appliedFilterName || filters.status || filters.category.length > 0
  );

  const isAnythingApplied = Boolean(
    appliedFilterName ||
      appliedSearchQuery ||
      filters.status ||
      filters.category.length > 0
  );

  const [selectedQuizIds, setSelectedQuizIds] = useState([]);
  const [showNewQuizPane, setShowNewQuizPane] = useState(false);
  const [showFilterPane, setShowFilterPane] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    category: true,
    status: true,
    submissions: true,
    createdAt: true,
  });

  const fetchQuizzes = useCallback(async () => {
    const params = new URLSearchParams(location.search);

    const filterQuery = params.get("filterQuery") || "";
    const searchQuery = params.get("query") || "";
    const finalQuery = filterQuery || searchQuery;

    setLoading(true);
    try {
      const { data } = await quizzesApi.fetch({
        query: finalQuery,
        status: params.get("status") || "",
        category: params.get("category")
          ? params.get("category").split(",")
          : [],
        page: Number(params.get("page")) || 1,
        pageSize: Number(params.get("pageSize")) || 10,
      });

      setQuizzes(data.quizzes || []);
      setTotalQuizCount(data.totalCount || 0);
      setSelectedQuizIds([]);
    } finally {
      setLoading(false);
    }
  }, [location.search]);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (debouncedSearchTerm) {
      params.set("query", debouncedSearchTerm);
    } else {
      params.delete("query");
    }

    history.replace({ search: params.toString() });
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setFilters({
      status: params.get("status") || "",
      category: params.get("category") ? params.get("category").split(",") : [],
    });
  }, [location.search]);

  const handlePageChange = (currentPage, newPageSize) => {
    const params = new URLSearchParams(location.search);
    params.set("page", currentPage);
    params.set("pageSize", newPageSize);
    history.replace({ search: params.toString() });
  };

  const handleFilterSubmit = newFilters => {
    const params = new URLSearchParams(location.search);

    newFilters.query
      ? params.set("filterQuery", newFilters.query)
      : params.delete("filterQuery");

    newFilters.status
      ? params.set("status", newFilters.status)
      : params.delete("status");

    newFilters.category?.length
      ? params.set("category", newFilters.category.join(","))
      : params.delete("category");

    params.set("page", 1);
    params.set("pageSize", params.get("pageSize") || 10);

    history.push({ search: params.toString() });
    setShowFilterPane(false);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(location.search);
    params.delete("filterQuery");
    params.delete("status");
    params.delete("category");
    params.delete("page");
    params.delete("pageSize");
    history.push({ search: params.toString() });
  };

  const toggleColumnVisibility = column => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  return (
    <Container isHeaderFixed className="overflow-x-auto">
      <Header
        title="All Quizzes"
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
      {loading ? (
        <div className="m-auto h-screen">
          <PageLoader />
        </div>
      ) : quizzes.length || isAnythingApplied ? (
        <>
          <TableHeader
            quizzesLength={quizzes.length}
            selectedQuizIds={selectedQuizIds}
            setQuizzes={setQuizzes}
            setSelectedQuizId={setSelectedQuizIds}
            toggleColumnVisibility={toggleColumnVisibility}
            visibleColumns={visibleColumns}
            onFilterClick={() => setShowFilterPane(true)}
          />
          {isFilterPaneApplied && (
            <SubHeader
              leftActionBlock={
                <div className="flex items-center gap-4">
                  {appliedFilterName && (
                    <div className="flex items-center gap-1">
                      <Typography style="h5">Name:</Typography>
                      <Typography className="text-gray-600">
                        {appliedFilterName}
                      </Typography>
                    </div>
                  )}
                  {filters.category.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Typography style="h5">Category:</Typography>
                      <Typography className="text-gray-600">
                        {filters.category.join(", ")}
                      </Typography>
                    </div>
                  )}
                  {filters.status && (
                    <div className="flex items-center gap-1">
                      <Typography style="h5">Status:</Typography>
                      <Typography className="text-gray-600">
                        {filters.status}
                      </Typography>
                    </div>
                  )}
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
            {!loading && quizzes.length === 0 && isAnythingApplied ? (
              <NoData
                className="flex min-h-[60vh] items-center justify-center px-0"
                title="No results found"
              />
            ) : (
              <Table
                currentPageNumber={currentPage}
                defaultPageSize={currentPageSize}
                handlePageChange={handlePageChange}
                quizzes={quizzes}
                selectedQuizIds={selectedQuizIds}
                setQuizzes={setQuizzes}
                setSelectedQuizIds={setSelectedQuizIds}
                totalQuizCount={totalQuizCount}
                visibleColumns={visibleColumns}
              />
            )}
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
