import React from "react";

import quizzesApi from "apis/quizzes";
import InlineEdit from "components/commons/InlineEdit";
import { LeftArrow, ExternalLink, Link } from "neetoicons";
import { Tab, Button, Tooltip } from "neetoui";
import { useHistory } from "react-router-dom";

const QuizHeader = ({
  quizId,
  quizName,
  onTitleChange,
  lastSavedAt,
  status,
  reloadQuizData,
  isQuestionBuilder,
}) => {
  const history = useHistory();
  const path = history.location.pathname;

  const onLeftArrowClick = () => {
    if (isQuestionBuilder) {
      history.goBack();
    } else {
      history.push("/quizzes");
    }
  };

  const onPublish = async () => {
    await quizzesApi.update(quizId, {
      quiz: { status: "published" },
    });

    reloadQuizData();
  };

  const onCopyLink = () => {
    const publicLink = `${window.location.origin}/public/${quizId}`;
    navigator.clipboard.writeText(publicLink);
    logger.log(publicLink);
  };

  return (
    <div className="w-full border-b bg-white px-6 py-3">
      <div className="grid grid-cols-3 items-center">
        <div className="flex items-center gap-3">
          <LeftArrow className="cursor-pointer" onClick={onLeftArrowClick} />
          <InlineEdit value={quizName} onSave={onTitleChange} />
        </div>
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
        {!isQuestionBuilder && (
          <div className="flex items-center justify-end gap-4 text-xs text-gray-600">
            {status === "draft" && lastSavedAt && (
              <p>Draft saved at {lastSavedAt}</p>
            )}
            <Button icon={ExternalLink} label="Publish" onClick={onPublish} />
            {status === "published" && (
              <Tooltip content="Copy quiz link">
                <Link className="cursor-pointer" onClick={onCopyLink} />
              </Tooltip>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizHeader;
