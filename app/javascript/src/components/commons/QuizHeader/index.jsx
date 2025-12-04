import React from "react";

import InlineEdit from "components/commons/InlineEdit";
import { LeftArrow } from "neetoicons";
import { Tab } from "neetoui";
import { useHistory } from "react-router-dom";

const QuizHeader = ({ quizId, quizName, onTitleChange }) => {
  const history = useHistory();
  const path = history.location.pathname;

  const onLeftArrowClick = () => {
    history.goBack();
  };

  return (
    <div className="w-full border-b bg-white px-6 py-3">
      <div className="grid grid-cols-3 items-center">
        <div className="flex items-center gap-3">
          <LeftArrow className="cursor-pointer" onClick={onLeftArrowClick} />
          <InlineEdit value={quizName} onSave={onTitleChange} />
        </div>
        {/* Tabs */}
        <div className="flex justify-center gap-4">
          <Tab.Item
            active={path.includes("questions")}
            onClick={() => history.push(`/quizzes/${quizId}/questions`)}
          >
            Questions
          </Tab.Item>
          <Tab.Item
            active={path.includes("submissions")}
            onClick={() => history.push(`/quizzes/${quizId}/submissions`)}
          >
            Submissions
          </Tab.Item>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;
