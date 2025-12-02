import React, { useState, useEffect } from "react";

import EmptyQuizzesListImage from "assets/images/EmptyQuizzesList";
import EmptyState from "components/commons/EmptyState";
import { useQuizzes } from "contexts/QuizzesContext";
import { Filter } from "neetoicons";
import { Button, PageLoader, Pagination } from "neetoui";
import { Container, Header } from "neetoui/layouts";
import { useHistory, useLocation } from "react-router-dom";

import DeleteAlert from "./DeleteAlert";
import NewNotePane from "./Pane/Create";
import Table from "./Table";

import ColumnIcon from "../../../assets/icons/column";
import useDebounce from "../../../hooks/useDebounce";

const Quizzes = () => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("query") || "";

  const { quizzes, fetchQuizzes, loading, pageTitle } = useQuizzes();
  const [showNewQuizPane, setShowNewQuizPane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    fetchQuizzes(debouncedSearchTerm);
    const params = new URLSearchParams();
    if (debouncedSearchTerm) {
      params.set("query", debouncedSearchTerm);
    }
    history.replace({ search: params.toString() });
  }, [debouncedSearchTerm]);

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
              fetchQuizzes={fetchQuizzes}
              quizzes={quizzes}
              selectedNoteIds={selectedNoteIds}
              setSelectedNoteIds={setSelectedNoteIds}
            />
          </div>
          <div className="p-4">
            <Pagination
              count={500}
              navigate={() => {}}
              pageNo={3}
              pageSize={100}
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
      <NewNotePane
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
