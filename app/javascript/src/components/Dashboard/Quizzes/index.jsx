import React, { useState, useEffect } from "react";

import EmptyQuizzesListImage from "assets/images/EmptyQuizzesList";
import EmptyState from "components/commons/EmptyState";
import { useQuizzes } from "contexts/QuizzesContext";
import { Filter } from "neetoicons";
import { Button, PageLoader } from "neetoui";
import { Container, Header } from "neetoui/layouts";
import { useHistory, useLocation } from "react-router-dom";

import DeleteAlert from "./DeleteAlert";
import NewQuizPane from "./Pane/Create";
import Table from "./Table";

import ColumnIcon from "../../../assets/icons/column";
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
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchQuizzes(debouncedSearchTerm, page, pageSize, status);

    const params = new URLSearchParams();
    if (debouncedSearchTerm) params.set("query", debouncedSearchTerm);
    params.set("status", status);
    params.set("page", page);
    params.set("pageSize", pageSize);
    history.replace({ search: params.toString() });
  }, [debouncedSearchTerm, page, pageSize, status]);

  const handlePageChange = (newPage, newPageSize) => {
    setPage(newPage);
    setPageSize(newPageSize);
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
          <Header
            title={`${quizzes.length} quizzes`}
            actionBlock={
              <div className="flex">
                <ColumnIcon height={20} width={30} />
                <Filter className="ml-2" size={20} />
              </div>
            }
          />
          <div className="w-full overflow-x-auto">
            <Table
              currentPageNumber={page}
              defaultPageSize={pageSize}
              handlePageChange={handlePageChange}
              loading={loading}
              quizzes={quizzes}
              selectedNoteIds={selectedNoteIds}
              setQuizzes={setQuizzes}
              setSelectedNoteIds={setSelectedNoteIds}
              totalQuizCount={totalQuizCount}
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
      {showDeleteAlert && (
        <DeleteAlert
          refetch={fetchQuizzes}
          selectedNoteIds={selectedNoteIds}
          setSelectedNoteIds={setSelectedNoteIds}
          onClose={() => setShowDeleteAlert(false)}
        />
      )}
    </Container>
  );
};

export default Quizzes;
