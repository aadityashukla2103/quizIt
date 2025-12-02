import React from "react";

import { Pane, Typography } from "neetoui";

import Form from "./Form";

import { QUIZZES_FORM_INITIAL_FORM_VALUES } from "../constants";

const Create = ({ fetchQuizzes, showPane, setShowPane }) => {
  const onClose = () => setShowPane(false);

  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Create a new quiz
        </Typography>
      </Pane.Header>
      <Form
        quiz={QUIZZES_FORM_INITIAL_FORM_VALUES}
        refetchQuizzes={fetchQuizzes}
        onClose={onClose}
      />
    </Pane>
  );
};

export default Create;
