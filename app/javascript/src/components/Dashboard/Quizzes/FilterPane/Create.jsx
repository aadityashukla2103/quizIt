import React from "react";

import { Pane, Typography } from "neetoui";

import { FILTERS_FORM_INITIAL_VALUES } from "./constants";
import Form from "./Form";

const Create = ({ fetchQuizzes, showPane, setShowPane }) => {
  const onClose = () => setShowPane(false);

  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Filters
        </Typography>
      </Pane.Header>
      <Form
        filters={FILTERS_FORM_INITIAL_VALUES}
        refetchQuizzes={fetchQuizzes}
        onClose={onClose}
      />
    </Pane>
  );
};

export default React.memo(Create);
